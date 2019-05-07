const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Team } = require('../../models/team');
const { Race } = require('../../models/race');
const { Driver } = require('../../models/driver');

//driver routes
router.get('/drivers-list', (req, res) => {
    Driver.find({}, 'id firstName lastName', function(error, drivers) {
        if (error) {
            return res.status(400).send(error);
        }

        return res.status(200).send(drivers);
    });
});

router.get('/drivers', (req, res) => {
    Driver.aggregate([{
                $lookup: {
                    from: "teams",
                    localField: "_id",
                    foreignField: "driver_1",
                    as: "team_1"
                }
            },
            {
                $lookup: {
                    from: "teams",
                    localField: "_id",
                    foreignField: "driver_2",
                    as: "team_2"
                }
            },
            {
                $project: {
                    "_id": true,
                    "firstName": true,
                    "lastName": true,
                    "number": true,
                    "driverImage": true,
                    "slug": true,
                    "team_1.shortName": true,
                    "team_2.shortName": true
                }
            }
        ])
        .exec()
        .then((drivers) => {
            drivers.map((driver) => {
                driver.driverImage = (driver.driverImage.length > 0) ? driver.driverImage[0].url : '';
                driver.team = driver.team_1.length !== 0 ? driver.team_1[0] : driver.team_2[0];
                driver.id = driver._id;
                driver.name = `${driver.firstName} ${driver.lastName}`;
                delete driver.team_1;
                delete driver.team_2;
                return driver;
            });

            return res.status(200).send(drivers);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/driver', (req, res) => {
    Driver.aggregate([
            { $match: { slug: req.query.slug } },
            {
                $lookup: {
                    from: "teams",
                    localField: "_id",
                    foreignField: "driver_1",
                    as: "team_1"
                }
            },
            {
                $lookup: {
                    from: "teams",
                    localField: "_id",
                    foreignField: "driver_2",
                    as: "team_2"
                }
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "_id",
                    as: "country"
                }
            }
        ])
        .exec()
        .then((driver) => {
            driver.map((driver) => {
                driver.driverImage = (driver.driverImage.length > 0) ? driver.driverImage[0].url : '';
                driver.driverHelmetImage = (driver.driverHelmetImage.length > 0) ? driver.driverHelmetImage[0].url : '';
                driver.team = driver.team_1.length !== 0 ? driver.team_1[0] : driver.team_2[0];
                driver.country = driver.country[0];
                driver.id = driver._id;
                driver.name = `${driver.firstName} ${driver.lastName}`;
                delete driver.team_1;
                delete driver.team_2;

                return driver;
            });

            return res.status(200).send(driver);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

//calendar routes
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
        .exec((error, race) => {
            if (error) {
                return res.status(400).send(error);
            }

            let raceNew = (race.length !== 0) ? race[0] : race;
            if (raceNew.result.length !== 0) {
                raceNew.result = raceNew.result[0];
            }

            return res.status(200).send(raceNew);
        });
});

//teams routes
router.get('/teams', (req, res) => {
    Team.find({})
        .populate('country')
        .populate({ path: 'driver_1', select: 'id firstName lastName' })
        .populate({ path: 'driver_2', select: 'id firstName lastName' })
        .exec()
        .then((teams2) => {
            let teams = [];
            teams2.forEach((team) => {
                let item = {
                    ...team.toObject(),
                    teamLogo: (team.teamLogo.length > 0) ? team.teamLogo[0].url.toString() : '',
                    teamCarImage: (team.teamCarImage.length > 0) ? team.teamCarImage[0].url.toString() : ''
                };
                teams.push(item);
            });

            return res.status(200).send(teams);
        }).catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/team', (req, res) => {
    Team.findOne({ 'slug': req.query.slug })
        .populate('country')
        .populate('driver_1')
        .populate('driver_2')
        .exec()
        .then((team2) => {
            let team = {
                ...team2.toObject(),
                teamLogo: (team2.teamLogo.length > 0) ? team2.teamLogo[0].url : '',
                teamCarImage: (team2.teamCarImage.length > 0) ? team2.teamCarImage[0].url : ''
            };
            team.driver_1.driverImage = (team2.driver_1.driverImage.length > 0) ? team2.driver_1.driverImage[0].url : '';
            team.driver_2.driverImage = (team2.driver_2.driverImage.length > 0) ? team2.driver_2.driverImage[0].url : '';
            let driver_1 = {
                driverImage: team.driver_1.driverImage,
                number: team.driver_1.number,
                firstName: team.driver_1.firstName,
                lastName: team.driver_1.lastName,
                slug: team.driver_1.slug,
                name: team.driver_1.name
            };
            let driver_2 = {
                driverImage: team.driver_2.driverImage,
                number: team.driver_2.number,
                firstName: team.driver_2.firstName,
                lastName: team.driver_2.lastName,
                slug: team.driver_2.slug,
                name: team.driver_2.name
            };
            team.driver_1 = driver_1;
            team.driver_2 = driver_2;

            return res.status(200).send(team);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

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

module.exports = router;