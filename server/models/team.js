const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = mongoose.Schema({
    officialName: {
        required: true,
        type: String,
        maxlength: 200
    },
    shortName: {
        required: true,
        type: String,
        maxlength: 100
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    driver_1: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    driver_2: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    base: {
        required: true,
        type: String,
        maxlength: 100
    },
    teamChief: {
        required: true,
        type: String,
        maxlength: 100
    },
    technicalChief: {
        required: true,
        type: String,
        maxlength: 100
    },
    chassisNumber: {
        required: true,
        type: String,
        maxlength: 100
    },
    powerUnit: {
        required: true,
        type: String,
        maxlength: 100
    },
    firstTeamEntry: {
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
    fastestLaps: {
        required: true,
        type: Number
    },
    podiums: {
        required: true,
        type: Number
    },
    slug: {
        required: true,
        type: String,
        maxlength: 200
    },
    teamColor: {
        required: true,
        type: String,
        maxlength: 100
    },
    teamLogo: {
        type: Array,
        default: []
    },
    teamCarImage: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    strict: true
});

teamSchema.set('toObject', { virtuals: true });
teamSchema.set("toJSON", { virtuals: true });
const Team = mongoose.model('Team', teamSchema);

module.exports = { Team };