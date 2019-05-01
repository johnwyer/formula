const express = require('express');
const router = express.Router();
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
    /*
    const getQuery = async() => {
        let query = await Driver.aggregate([{
                $lookup: {
                    from: "teams",
                    localField: "_id",
                    foreignField: "driver_1",
                    as: "team1"
                }
            },
            {
                $lookup: {
                    from: "teams",
                    localField: "_id",
                    foreignField: "driver_2",
                    as: "team2"
                }
            }
        ]).exec();

        return query;
    };

    let query = getQuery();
    query.then((drivers) => {
        drivers.map((item) => {
            console.log(item.team1.length, item.team2.length);
            return obj = {
                ...item,
                team: []
            };
        });

        return res.status(200).send(drivers);
    }).catch((error) => {
        return res.status(400).send(error);
    });
    */

    /*
    query.exec(function(error, drivers) {
        if (error) {
            return res.status(400).send(error);
        }

        drivers.map((item) => {
            let obj = {
                ...item,
                team: []
            };
            console.log(item.team1.length, item.team2.length);

            (item.team1.length === 0) ? obj.team.push(item.team2): obj.team.push(item.team1);

            return obj;
        });

        return res.status(200).send(drivers);
    });*/

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
            }
        ])
        .exec((error, drivers) => {
            if (error) {
                return res.status(400).send(error);
            }

            return res.status(200).send(drivers);
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
            }
        ])
        .exec((error, driver) => {
            if (error) {
                return res.status(400).send(error);
            }

            return res.status(200).send(driver);
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
        .exec((error, races) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(races);
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
        .exec((error, teams) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(teams);
        });
});

router.get('/team', (req, res) => {
    Team.findOne({ 'slug': req.query.slug })
        .populate('country')
        .populate('driver_1')
        .populate('driver_2')
        //.populate({ path: 'driver_1', select: 'id firstName lastName' })
        //.populate({ path: 'driver_2', select: 'id firstName lastName' })
        .exec((error, team) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(team);
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