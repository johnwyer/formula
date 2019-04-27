const express = require('express');
const router = express.Router();
const { Country } = require('../models/country');


router.get('/countries', (req, res) => {
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

module.exports = router;