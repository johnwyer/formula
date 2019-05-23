const express = require('express');
const router = express.Router();
const { Driver } = require('../../models/driver');

router.get('/list', (req, res) => {
    Driver.find({}, 'id firstName lastName', function(error, drivers) {
        if (error) {
            return res.status(400).send(error);
        } else {
            return res.status(200).send(drivers);
        }
    });
});

router.get('/drivers', (req, res) => {
    console.log('/site/drivers');

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

module.exports = router;