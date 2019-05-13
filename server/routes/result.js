const express = require('express');
const router = express.Router();
const { Race } = require('../models/race');
const { Result } = require('../models/result');
const { Driver } = require('../models/driver');
const { Team } = require('../models/team');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
//const { cloudinary } = require('../middleware/cloudinary');

router.get('/results', auth, admin, async(req, res) => {
    Race.aggregate([{
            $lookup: {
                from: "results",
                localField: "_id",
                foreignField: "race",
                as: "result"
            }
        },
        {
            $lookup: {
                from: "countries",
                localField: "country",
                foreignField: "_id",
                as: "country"
            }
        },
        {
            $unwind: '$country'
        }
    ]).exec(function(error, results) {
        if (error) {
            return res.status(400).send(error);
        } else {
            return res.status(200).send(results);
        }
    });
});

router.get('/get', auth, admin, (req, res) => {
    Result.findOne({ 'race': req.query.id })
        .populate({ path: 'position_1.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_2.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_3.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_4.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_5.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_6.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_7.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_8.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_9.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_10.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_11.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_12.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_13.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_14.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_15.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_16.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_17.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_18.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_19.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_20.driver', select: 'id firstName lastName' })
        .populate({ path: 'fastestLap.driver', select: 'id firstName lastName' })
        .exec((error, result) => {
            if (error) {
                return res.status(400).send(error);
            } else {
                return res.send(result);
            }
        });
});

router.post('/add', auth, admin, (req, res) => {
    const result = new Result(req.body);

    result.save()
        .then(async(result) => {
            const pointsSystem = {
                '1': 25,
                '2': 18,
                '3': 15,
                '4': 12,
                '5': 10,
                '6': 8,
                '7': 6,
                '8': 4,
                '9': 2,
                '10': 1
            };

            const entries = Object.entries(result.toObject());
            let driversList = await Driver.find({}).exec();
            let teamsList = await Team.find({}).exec();

            let inc = {},
                set = {};

            //update drivers
            entries.forEach(async(entry) => {
                inc = {};
                set = {};
                if (/position_/i.test(entry[0])) {
                    if (entry[1].position == 1) {
                        inc.numberOfWictories = 1;
                        set.highestRaceFinish = 1;
                    }
                    if (entry[1].position < 4) {
                        inc.podiums = 1;
                    }
                    if (entry[1].position < 11) {
                        inc.points = pointsSystem[entry[1].position];
                    }
                    inc.grandPrix = 1;

                    driversList.forEach((driver) => {
                        if (driver.id == entry[1].driver) {
                            if (driver.highestRaceFinish > entry[1].position) {
                                if (driver.numberOfWictories == 0 && entry[1].position != 1) {
                                    set.highestRaceFinish = entry[1].position;
                                }
                            }
                        }
                    });

                    await Driver.findOneAndUpdate({ _id: entry[1].driver }, {
                            $inc: inc,
                            $set: set
                        }, { new: true })
                        .exec();
                }

                if (/fastest/i.test(entry[0])) {
                    await Driver.findOneAndUpdate({ _id: entry[1].driver }, {
                            $inc: { points: 1 },
                            $set: { polePositions: 1 }
                        }, { new: true })
                        .exec();
                }
            });

            //update teams
            entries.forEach(async(entry) => {
                inc = {};
                set = {};
                if (/position_/i.test(entry[0])) {
                    teamsList.forEach(async(team) => {
                        if (team.driver_1.toString() == entry[1].driver.toString() || team.driver_2.toString() == entry[1].driver.toString()) {
                            if (entry[1].position == 1) {
                                inc.numberOfWictories = 1;
                                set.highestRaceFinish = 1;
                            }
                            if (entry[1].position < 4) {
                                inc.podiums = 1;
                            }
                            if (entry[1].position < 11) {
                                inc.points = pointsSystem[entry[1].position];
                            }

                            if (team.highestRaceFinish > entry[1].position) {
                                if (team.numberOfWictories == 0 && entry[1].position != 1) {
                                    set.highestRaceFinish = entry[1].position;
                                }
                            }

                            if (Object.keys(inc).length > 0 || Object.keys(set).length > 0) {
                                await Team.findOneAndUpdate({ _id: team.id }, {
                                        $inc: inc,
                                        $set: set
                                    }, { new: true })
                                    .exec();
                            }
                        }
                    });
                }

                if (/fastest/i.test(entry[0])) {
                    teamsList.forEach(async(team) => {
                        if (team.driver_1.toString() == entry[1].driver.toString() || team.driver_2.toString() == entry[1].driver.toString()) {

                            await Team.findOneAndUpdate({ _id: team.id }, {
                                    $inc: { "fastestLaps": 1 }
                                }, { new: true })
                                .exec();
                        }
                    });
                }
            });

            await Result.findOneAndUpdate({ _id: result.id }, { $set: { "published": true } }).exec();

            return res.status(200).json({
                success: true,
                result: result
            });
        })
        .catch((error) => {
            return res.json({
                success: false,
                error
            });
        });
});

router.post('/update', auth, admin, (req, res) => {
    Result.findOneAndUpdate({ race: req.body.race }, { "$set": req.body }, { new: true }, (error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        } else {
            return res.status(200).json({
                success: true,
                result: doc
            });
        }
    });
});

router.post('/delete', auth, admin, (req, res) => {
    Result.findOneAndRemove({ race: req.body.id }, (error, result) => {
        if (error) {
            return res.status(400).send(error);
        }

        Race.aggregate([{
                $lookup: {
                    from: "results",
                    localField: "_id",
                    foreignField: "race",
                    as: "result"
                }
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "_id",
                    as: "country"
                }
            },
            {
                $unwind: '$country'
            }
        ]).exec(function(error, results) {
            if (error) {
                return res.status(400).send(error);
            } else {
                return res.status(200).send(results);
            }
        });
    });
});

module.exports = router;