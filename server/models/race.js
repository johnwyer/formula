const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceSchema = mongoose.Schema({
    shortName: {
        required: true,
        type: String,
        maxlength: 100
    },
    fullName: {
        required: true,
        type: String,
        maxlength: 200
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true
    },
    dateStart: {
        required: true,
        type: Date
    },
    dateEnd: {
        required: true,
        type: Date
    },
    slug: {
        required: true,
        unique: true,
        type: String,
        maxlength: 200
    },
    headingImage: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    strict: true
});

raceSchema.set("toJSON", { virtuals: true });
const Race = mongoose.model("Race", raceSchema);

module.exports = { Race };