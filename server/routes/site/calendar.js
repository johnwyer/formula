const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Race } = require('../../models/race');
const { Driver } = require('../../models/driver');
const { Team } = require('../../models/team');

router.get('/teams-drivers', (req, res) => {
    Team.find({})
        .select(['id', 'teamColor', 'officialName', 'shortName', 'driver_1', 'driver_2'])
        .populate({ path: 'driver_1', select: 'id firstName lastName' })
        .populate({ path: 'driver_2', select: 'id firstName lastName' })
        .exec((error, teams) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(teams);
        });
});

router.get('/races', (req, res) => {
    console.log('get races');
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
                $lookup: {
                    from: "tracks",
                    localField: "track",
                    foreignField: "_id",
                    as: "track"
                }
            },
            {
                $unwind: '$country'
            },
            {
                $unwind: '$track'
            }
        ])
        .then(async(races2) => {
            let races = [];
            const driversList = await Driver
                .find({}, 'id firstName lastName')
                .exec();

            races2.forEach((race) => {
                let item = {
                    ...race,
                    track: {},
                    raceWinner: ''
                };
                item.isExpired = moment(race.dateEnd) < moment() ? true : false;
                item.track.trackImage = (race.track.trackImage.length > 0) ? race.track.trackImage[0].url : '';

                if (race.result.length !== 0) {
                    driversList.forEach((element) => {
                        if (element.id == race.result[0].position_1.driver) {
                            item.raceWinner = element.name;
                        }
                    });
                }

                races.push(item);
            });

            return res.status(200).send(races);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/race', (req, res) => {
    console.log('get race');
    Race.aggregate([
            { $match: { slug: req.query.slug } },
            {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "_id",
                    as: "country"
                }
            },
            {
                $lookup: {
                    from: "tracks",
                    localField: "track",
                    foreignField: "_id",
                    as: "track"
                }
            },
            {
                $lookup: {
                    from: "results",
                    localField: "_id",
                    foreignField: "race",
                    as: "result"
                }
            },
            { $unwind: '$country' },
            { $unwind: '$track' },
            { $limit: 1 }
        ])
        .exec()
        .then(async(race2) => {
            let race = (race2.length !== 0) ? race2[0] : race2;
            if (race.result.length !== 0) {
                race.result = race.result[0];
            }

            race.headingImage = (race.headingImage.length > 0) ? race.headingImage[0].url : '';
            race.isExpired = moment(race.dateEnd) < moment() ? true : false;
            race.track.trackConfiguration = (race.track.trackConfiguration.length > 0) ? race.track.trackConfiguration[0].url : '';

            if (race.isExpired && race.result.length !== 0) {
                let teamsDrivers = await Team.find({})
                    .select(['id', 'teamColor', 'officialName', 'shortName', 'driver_1', 'driver_2'])
                    .populate({ path: 'driver_1', select: 'id firstName lastName' })
                    .populate({ path: 'driver_2', select: 'id firstName lastName' })
                    .exec();

                Array.from({ length: teamsDrivers.length * 2 }).forEach((item, i) => {
                    let key = `position_${i + 1}`;
                    let driverId = race.result[key].driver;
                    let driver = {};

                    teamsDrivers.forEach((element) => {
                        if (element.driver_1.id == driverId) {
                            driver = {
                                id: element.driver_1.id,
                                firstName: element.driver_1.firstName,
                                lastName: element.driver_1.lastName,
                                teamOfficialName: element.officialName,
                                teamShortName: element.shortName,
                                teamColor: element.teamColor
                            };
                        }
                        if (element.driver_2.id == driverId) {
                            driver = {
                                id: element.driver_2.id,
                                firstName: element.driver_2.firstName,
                                lastName: element.driver_2.lastName,
                                teamOfficialName: element.officialName,
                                teamShortName: element.shortName,
                                teamColor: element.teamColor
                            };
                        }

                        race.result[key].driver = driver;
                    });
                });

                let results = [];
                for (let key in race.result) {
                    if (/position_/i.test(key)) {
                        results.push(race.result[key]);
                    }
                }
                race.result = results;
            }

            return res.status(200).send(race);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

module.exports = router;