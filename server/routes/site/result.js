const express = require('express');
const router = express.Router();
const { Race } = require('../../models/race');
const { Result } = require('../../models/result');
const { Team } = require('../../models/team');

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
                $unwind: '$country'
            }
        ])
        .exec()
        .then(async(results2) => {
            let results = [];
            results2.forEach((item, i) => {
                let res = {
                    id: item._id,
                    countryName: item.country.name,
                    slug: item.slug,
                    result: item.result.length > 0 ? item.result[0].position_1 : {}
                };
                results.push(res);
            });

            let teamsDrivers = await Team.find({})
                .select(['id', 'shortName', 'driver_1', 'driver_2'])
                .populate({ path: 'driver_1', select: 'id firstName lastName' })
                .populate({ path: 'driver_2', select: 'id firstName lastName' })
                .exec();

            results.forEach((result, key) => {
                if (Object.keys(result.result).length > 0) {
                    let driverId = result.result.driver;
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

                        results[key].result.driver = driver;
                    });
                }
            });

            return res.status(200).send(results);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/result', (req, res) => {

});

module.exports = router;