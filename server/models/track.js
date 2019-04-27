const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = mongoose.Schema({
    officialName: {
        required: true,
        type: String,
        maxlength: 200
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    firstFrandPrixEntry: {
        required: true,
        type: Number
    },
    cirquitLength: {
        required: true,
        type: String,
        maxlength: 100
    },
    numberOfLaps: {
        required: true,
        type: Number
    },
    raceDistance: {
        required: true,
        type: String,
        maxlength: 100
    },
    lapRecord: {
        required: true,
        type: String,
        maxlength: 100
    },
    lapRecordOwner: {
        required: true,
        type: String,
        maxlength: 100
    },
    trackConfiguration: {
        type: Array,
        default: []
    },
    trackImage: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

trackSchema.virtual('name').get(function() {
    return this.officialName;
});

trackSchema.set('toObject', { virtuals: true });
trackSchema.set("toJSON", { virtuals: true });
const Track = mongoose.model("Track", trackSchema);
module.exports = { Track };