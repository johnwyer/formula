const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    firstname: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    resetToken: {
        type: String
    },
    resetTokenExp: {
        type: Number
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    console.log('User.comparePassword ', candidatePassword, this.password);
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateResetToken = function(cb) {
    var user = this;
    crypto.randomBytes(20, function(error, buffer) {
        var token = buffer.toString('hex');
        var today = moment().startOf('day').valueOf();
        var tomorrow = moment(today).endOf('day').valueOf();

        user.resetToken = token;
        user.resetTokenExp = tomorrow;

        user.save(function(error, user) {
            if (error) {
                return cb(error);
            }
            cb(null, user);
        });
    });
};

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    jwt.verify(token, process.env.SECRET, function(error, decode) {
        user.findOne({
            "_id": decode,
            "token": token
        }, function(error, user) {
            if (error) {
                return cb(error);
            }

            cb(null, user);
        });
    });
};

userSchema.set("toJSON", { virtuals: true });
const User = mongoose.model('User', userSchema);

module.exports = { User };