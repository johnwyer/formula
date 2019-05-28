const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Race } = require('../../models/race');
const { Country } = require('../../models/country');
const { Team } = require('../../models/team');
const { Driver } = require('../../models/driver');

router.get('/results', (req, res) => {
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
        .exec()
        .then(async(results2) => {
            let results = [];
            results2.forEach((item, i) => {
                let result = {
                    id: item._id,
                    countryName: item.country.name,
                    slug: item.slug,
                    dateEnd: moment(item.dateEnd).format('DD MMM YYYY'),
                    numberOfLaps: item.track.numberOfLaps,
                    result: item.result.length > 0 ? item.result[0].position_1 : {}
                };

                if (Object.keys(result.result).length) {
                    results.push(result);
                }
            });

            let teamsDrivers = await Team.find({})
                .select(['id', 'shortName', 'driver_1', 'driver_2'])
                .populate({ path: 'driver_1', select: 'id firstName lastName' })
                .populate({ path: 'driver_2', select: 'id firstName lastName' })
                .exec();

            results.forEach((result, key) => {
                let driverId = result.result.driver;
                let driver = {};

                teamsDrivers.forEach((element) => {
                    if (element.driver_1.id == driverId) {
                        driver = {
                            id: element.driver_1.id,
                            firstName: element.driver_1.firstName,
                            lastName: element.driver_1.lastName,
                            lastNameShort: element.driver_1.lastName.substring(0, 3),
                            teamShortName: element.shortName
                        };
                    }
                    if (element.driver_2.id == driverId) {
                        driver = {
                            id: element.driver_2.id,
                            firstName: element.driver_2.firstName,
                            lastName: element.driver_2.lastName,
                            lastNameShort: element.driver_2.lastName.substring(0, 3),
                            teamShortName: element.shortName
                        };
                    }

                    results[key].result.driver = driver;
                });
            });

            return res.status(200).send(results);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/result', (req, res) => {
    //console.log('result/result');
    //console.time('result/result');
    Race.aggregate([
            { $match: { slug: req.query.slug } },
            {
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
                $unwind: '$track'
            }
        ])
        .exec()
        .then(async(item) => {
            item = item[0];
            let result = {
                id: item._id,
                countryName: item.country.name,
                slug: item.slug,
                shortName: item.shortName,
                fullName: item.fullName,
                trackOfficialName: item.track.officialName,
                dateStart: item.dateStart,
                dateEnd: item.dateEnd,
                numberOfLaps: item.track.numberOfLaps,
                result: item.result[0]
            };

            let teamsDrivers = await Team.find({})
                .select(['id', 'shortName', 'officialName', 'powerUnit', 'chassisNumber', 'teamColor', 'driver_1', 'driver_2'])
                .populate({ path: 'driver_1', select: 'id firstName lastName number' })
                .populate({ path: 'driver_2', select: 'id firstName lastName number' })
                .exec();

            const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

            Array.from({ length: teamsDrivers.length * 2 }).forEach((team, i) => {
                let key = `position_${i + 1}`;
                let driverId = result.result[key].driver;
                let driver = {};

                teamsDrivers.forEach((element) => {
                    if (element.driver_1.id == driverId) {
                        driver = {
                            id: element.driver_1.id,
                            firstName: element.driver_1.firstName,
                            lastName: element.driver_1.lastName,
                            lastNameShort: element.driver_1.lastName.substring(0, 3),
                            number: element.driver_1.number,
                            teamOfficialName: element.officialName,
                            teamShortName: element.shortName,
                            teamColor: element.teamColor,
                            powerUnit: element.powerUnit,
                            chassisNumber: element.chassisNumber,
                            points: (i < 10) ? pointsSystem[i] : 0
                        };
                    }
                    if (element.driver_2.id == driverId) {
                        driver = {
                            id: element.driver_2.id,
                            firstName: element.driver_2.firstName,
                            lastName: element.driver_2.lastName,
                            lastNameShort: element.driver_2.lastName.substring(0, 3),
                            number: element.driver_2.number,
                            teamOfficialName: element.officialName,
                            teamShortName: element.shortName,
                            teamColor: element.teamColor,
                            powerUnit: element.powerUnit,
                            chassisNumber: element.chassisNumber,
                            points: (i < 10) ? pointsSystem[i] : 0
                        };
                    }

                    result.result[key].driver = driver;
                });
            });

            let driver = {};
            teamsDrivers.forEach((element) => {
                if (element.driver_1.id == result.result.fastestLap.driver) {
                    driver = {
                        id: element.driver_1.id,
                        firstName: element.driver_1.firstName,
                        lastName: element.driver_1.lastName,
                        lastNameShort: element.driver_1.lastName.substring(0, 3),
                        number: element.driver_1.number,
                        teamOfficialName: element.officialName,
                        teamShortName: element.shortName,
                        teamColor: element.teamColor,
                        powerUnit: element.powerUnit,
                        chassisNumber: element.chassisNumber,
                        points: 1
                    };
                }
                if (element.driver_2.id == result.result.fastestLap.driver) {
                    driver = {
                        id: element.driver_2.id,
                        firstName: element.driver_2.firstName,
                        lastName: element.driver_2.lastName,
                        lastNameShort: element.driver_2.lastName.substring(0, 3),
                        number: element.driver_2.number,
                        teamOfficialName: element.officialName,
                        teamShortName: element.shortName,
                        teamColor: element.teamColor,
                        powerUnit: element.powerUnit,
                        chassisNumber: element.chassisNumber,
                        points: 1
                    };
                }
            });
            result.result.fastestLap.driver = driver;

            let results = [];
            let fastestLap = {};
            Object.keys(result.result).map(function(key, index) {
                if (/position_/i.test(key)) {
                    results.push(result.result[key]);
                }
                if (/fastest/i.test(key)) {
                    fastestLap = result.result[key];
                }
            });
            result.result = results;
            result.fastestLap = fastestLap;

            result.result.map((item) => {
                if (item.driver.id === result.fastestLap.driver.id) {
                    item.driver.points = item.driver.points + result.fastestLap.driver.points
                }

                return item;
            });

            //console.timeEnd('result/result');

            return res.status(200).send(result);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/last', (req, res) => {
    //console.log('/site/result/last');
    //return res.status(400).send(new Error('Server error'));
    //console.time('/results/drivers/last');

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
        .exec()
        .then(async(results2) => {
            let results = [];
            results2.forEach((item, i) => {
                let result = {
                    id: item._id,
                    countryName: item.country.name,
                    slug: item.slug,
                    fullName: item.fullName,
                    result: item.result.length > 0 ? item.result : {}
                };

                if (Object.keys(result.result).length) {
                    results.push(result);
                }
            });

            results = results[results.length - 1];
            results.result = results.result[0];

            let teamsDrivers = await Team.find({})
                .select(['id', 'shortName', 'officialName', 'powerUnit', 'chassisNumber', 'teamColor', 'driver_1', 'driver_2'])
                .populate({ path: 'driver_1', select: 'id firstName lastName slug' })
                .populate({ path: 'driver_2', select: 'id firstName lastName slug' })
                .exec();

            const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

            Array.from({ length: teamsDrivers.length * 2 }).forEach((team, i) => {
                let key = `position_${i + 1}`;
                let driverId = results.result[key].driver;
                let driver = {};

                teamsDrivers.forEach((element) => {
                    if (element.driver_1.id == driverId) {
                        driver = {
                            id: element.driver_1.id,
                            firstName: element.driver_1.firstName,
                            lastName: element.driver_1.lastName,
                            slug: element.driver_1.slug,
                            teamShortName: element.shortName,
                            teamColor: element.teamColor,
                            points: (i < 10) ? pointsSystem[i] : 0
                        };
                    }
                    if (element.driver_2.id == driverId) {
                        driver = {
                            id: element.driver_2.id,
                            firstName: element.driver_2.firstName,
                            lastName: element.driver_2.lastName,
                            slug: element.driver_2.slug,
                            teamShortName: element.shortName,
                            teamColor: element.teamColor,
                            points: (i < 10) ? pointsSystem[i] : 0
                        };
                    }

                    results.result[key].driver = driver;
                });
            });

            let driver = {};
            teamsDrivers.forEach((element) => {
                if (element.driver_1.id == results.result.fastestLap.driver) {
                    driver = {
                        id: element.driver_1.id,
                        firstName: element.driver_1.firstName,
                        lastName: element.driver_1.lastName,
                        slug: element.driver_1.slug,
                        teamShortName: element.shortName,
                        teamColor: element.teamColor,
                        points: 1
                    };
                }
                if (element.driver_2.id == results.result.fastestLap.driver) {
                    driver = {
                        id: element.driver_2.id,
                        firstName: element.driver_2.firstName,
                        lastName: element.driver_2.lastName,
                        slug: element.driver_2.slug,
                        teamShortName: element.shortName,
                        teamColor: element.teamColor,
                        points: 1
                    };
                }
            });
            results.result.fastestLap.driver = driver;

            let result = [];
            let fastestLap = {};
            Object.keys(results.result).map(function(key, index) {
                if (/position_/i.test(key)) {
                    result.push(results.result[key]);
                }
                if (/fastest/i.test(key)) {
                    fastestLap = results.result[key];
                }
            });

            result.map((item) => {
                if (item.driver.id === fastestLap.driver.id) {
                    item.driver.points = item.driver.points + fastestLap.driver.points
                }

                return item;
            });

            results.result = result;
            //console.timeEnd('/results/drivers/last');

            return res.status(200).send(results);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/drivers', (req, res) => {
    //console.log('/results/drivers');
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
        .exec()
        .then(async(results2) => {
            let results = [];
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

            results2.forEach((item, i) => {
                let result = {
                    id: item._id,
                    countryName: item.country.name,
                    slug: item.slug,
                    dateEnd: moment(item.dateEnd).format('DD MMM YYYY'),
                    numberOfLaps: item.track.numberOfLaps,
                    result: item.result.length > 0 ? item.result : {}
                };

                if (Object.keys(result.result).length) {
                    results.push(result);
                }
            });

            const teamsDrivers = await Team.find({})
                .select(['id', 'shortName', 'driver_1', 'driver_2', 'slug', 'teamColor'])
                .populate({ path: 'driver_1', select: 'id firstName lastName number country slug' })
                .populate({ path: 'driver_2', select: 'id firstName lastName number country slug' })
                .exec();

            let drivers = [],
                driver;
            teamsDrivers.forEach((element) => {
                driver = {
                    id: element.driver_1.id,
                    firstName: element.driver_1.firstName,
                    lastName: element.driver_1.lastName,
                    lastNameShort: element.driver_1.lastName.substring(0, 3),
                    slug: element.driver_1.slug,
                    teamShortName: element.shortName,
                    teamColor: element.teamColor,
                    teamSlug: element.slug,
                    countryId: element.driver_1.country,
                    country: {},
                    points: 0
                };
                drivers.push(driver);
                driver = {
                    id: element.driver_2.id,
                    firstName: element.driver_2.firstName,
                    lastName: element.driver_2.lastName,
                    lastNameShort: element.driver_2.lastName.substring(0, 3),
                    slug: element.driver_2.slug,
                    teamShortName: element.shortName,
                    teamColor: element.teamColor,
                    teamSlug: element.slug,
                    countryId: element.driver_2.country,
                    country: {},
                    points: 0
                };
                drivers.push(driver);
            });

            const countries = await Country.find({})
                .exec();

            drivers.map((driver) => {
                countries.forEach((country) => {
                    if (String(driver.countryId) === String(country._id)) {
                        driver.country = country;

                        return driver;
                    }
                });
            });

            results.forEach((result, key2) => {
                result.result.forEach((resultDriver, key) => {
                    let entries = Object.entries(resultDriver);

                    entries.forEach((entry) => {
                        if (/position_/i.test(entry[0])) {
                            if (entry[1].position <= 10) {
                                drivers.map((driver) => {
                                    if (entry[1].driver == driver.id) {
                                        driver.points = driver.points + pointsSystem[entry[1].position];
                                    }

                                    return driver;
                                });
                            }
                        }

                        if (/fastest/i.test(entry[0])) {
                            drivers.map((driver) => {
                                if (entry[1].driver == driver.id) {
                                    driver.points += 1;
                                }

                                return driver;
                            });
                        }
                    });
                })
            });

            drivers.sort((a, b) => (a.points > b.points) ? 1 : -1).reverse();

            return res.status(200).send(drivers);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/teams', (req, res) => {
    //console.log('/results/teams');
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
        .exec()
        .then(async(results2) => {
            let results = [];
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

            results2.forEach((item, i) => {
                let result = {
                    result: item.result.length > 0 ? item.result : {}
                };

                if (Object.keys(result.result).length) {
                    results.push(result);
                }
            });

            let teamsList = await Team.aggregate([{
                $project: {
                    "id": "$_id",
                    "shortName": "$shortName",
                    "officialName": "$officialName",
                    "driver_1": "$driver_1",
                    "driver_2": "$driver_2",
                    "teamColor": "$teamColor",
                    "slug": "$slug",
                    "teamLogo": "$teamLogo"
                }
            }, {
                $addFields: {
                    points: 0
                }
            }]).exec();

            teamsList.map((team) => {
                return team.teamLogo = team.teamLogo[0].url;
            });

            const driversList = await Driver.aggregate([{
                $project: {
                    'id': "$_id",
                    'firstName': true,
                    'lastName': true
                }
            }]).exec();

            driversList.forEach((driver) => {
                teamsList.map((team) => {
                    if (String(team.driver_1) === String(driver.id)) {
                        team.driver_1_lastName = driver.lastName;
                    }
                    if (String(team.driver_2) === String(driver.id)) {
                        team.driver_2_lastName = driver.lastName;
                    }

                    return team;
                });
            });

            results.forEach((result) => {
                result.result.forEach((resultDriver) => {
                    let entries = Object.entries(resultDriver);

                    entries.forEach((entry) => {
                        if (/position_/i.test(entry[0])) {
                            if (entry[1].position <= 10) {
                                teamsList.map((team) => {
                                    if (String(entry[1].driver) === String(team.driver_1) || String(entry[1].driver) === String(team.driver_2)) {
                                        team.points = team.points + pointsSystem[entry[1].position];
                                    }

                                    return team;
                                });
                            }
                        }

                        if (/fastest/i.test(entry[0])) {
                            teamsList.map((team) => {
                                if (String(entry[1].driver) === String(team.driver_1) || String(entry[1].driver) === String(team.driver_2)) {
                                    team.points += 1;
                                }

                                return team;
                            });
                        }
                    });
                })
            });

            teamsList.sort((a, b) => (a.points > b.points) ? 1 : -1).reverse();

            return res.status(200).send(teamsList);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

module.exports = router;