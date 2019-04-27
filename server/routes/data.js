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
            result: ""
        },
        position_2: {
            position: 2,
            driver: {},
            result: ""
        },
        position_3: {
            position: 3,
            driver: {},
            result: ""
        },
        position_4: {
            position: 4,
            driver: {},
            result: ""
        },
        position_5: {
            position: 5,
            driver: {},
            result: ""
        },
        position_6: {
            position: 6,
            driver: {},
            result: ""
        },
        position_7: {
            position: 7,
            driver: {},
            result: ""
        },
        position_8: {
            position: 8,
            driver: {},
            result: ""
        },
        position_9: {
            position: 9,
            driver: {},
            result: ""
        },
        position_10: {
            position: 10,
            driver: {},
            result: ""
        },
        position_11: {
            position: 11,
            driver: {},
            result: ""
        },
        position_12: {
            position: 12,
            driver: {},
            result: ""
        },
        position_13: {
            position: 13,
            driver: {},
            result: ""
        },
        position_14: {
            position: 14,
            driver: {},
            result: ""
        },
        position_15: {
            position: 15,
            driver: {},
            result: ""
        },
        position_16: {
            position: 16,
            driver: {},
            result: ""
        },
        position_17: {
            position: 17,
            driver: {},
            result: ""
        },
        position_18: {
            position: 18,
            driver: {},
            result: ""
        },
        position_19: {
            position: 19,
            driver: {},
            result: ""
        },
        position_20: {
            position: 20,
            driver: {},
            result: ""
        }
    };

    res.status(200).send(result);
});

module.exports = router;