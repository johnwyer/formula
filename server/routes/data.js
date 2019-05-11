const express = require('express');
const router = express.Router();
const { Driver } = require('../models/driver');
const { Country } = require('../models/country');
const { Track } = require('../models/track');
const { Result } = require('../models/result');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.get('/option/drivers', (req, res) => {
    Driver.find({}, 'id firstName lastName', function(error, drivers) {
        if (error) {
            return res.status(400).send(error);
        }

        return res.status(200).send(drivers);
    });
});

router.get('/option/tracks', (req, res) => {
    Track.find({}, 'id officialName', (error, tracks) => {
        if (error) {
            return res.status(400).send(error);
        }

        res.status(200).send(tracks);
    });
});

router.get('/option/countries', (req, res) => {
    Country
        .find({})
        .sort({ name: 'asc' })
        .exec((error, countries) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(countries);
        });
});

router.get('/option/result', (req, res) => {
    const result = {
        race: req.query.id,
        position_1: {
            position: 1,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_2: {
            position: 2,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_3: {
            position: 3,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_4: {
            position: 4,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_5: {
            position: 5,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_6: {
            position: 6,
            driver: {},
            laps: "",
            result: ""
        },
        position_7: {
            position: 7,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_8: {
            position: 8,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_9: {
            position: 9,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_10: {
            position: 10,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_11: {
            position: 11,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_12: {
            position: 12,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_13: {
            position: 13,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_14: {
            position: 14,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_15: {
            position: 15,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_16: {
            position: 16,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_17: {
            position: 17,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_18: {
            position: 18,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_19: {
            position: 19,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        position_20: {
            position: 20,
            driver: {},
            laps: "",
            result: "",
            type: ""
        },
        fastestLap: {
            position: 1,
            driver: {},
            laps: "",
            result: "",
            type: ""
        }
    };

    res.status(200).send(result);
});

module.exports = router;