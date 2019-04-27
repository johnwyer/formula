const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = mongoose.Schema({
    firstName: {
        required: true,
        type: String,
        maxlength: 100
    },
    lastName: {
        required: true,
        type: String,
        maxlength: 100
    },
    number: {
        required: true,
        type: Number
    },
    //team: {},
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    podiums: {
        required: true,
        type: Number
    },
    points: {
        required: true,
        type: Number
    },
    grandPrix: {
        required: true,
        type: Number
    },
    worldChampionships: {
        required: true,
        type: Number
    },
    highestRaceFinish: {
        required: true,
        type: Number
    },
    numberOfWictories: {
        required: true,
        type: Number
    },
    polePositions: {
        required: true,
        type: Number
    },
    dateOfBirth: {
        required: true,
        type: String
    },
    placeOfBirth: {
        required: true,
        type: String,
        maxlength: 100
    },
    slug: {
        required: true,
        type: String,
        maxlength: 200
    },
    driverImage: {
        type: Array,
        default: []
    },
    driverHelmetImage: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});


driverSchema.virtual('name').get(function() {
    return this.firstName + ' ' + this.lastName;
});


driverSchema.set('toObject', { virtuals: true });
driverSchema.set("toJSON", { virtuals: true });
const Driver = mongoose.model('Driver', driverSchema);

module.exports = { Driver };