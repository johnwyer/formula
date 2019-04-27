const express = require('express');
const router = express.Router();
const { Race } = require('../../models/race');

router.get('/races', (req, res) => {
    console.log('get races');
    Race.find({})
        .populate('country')
        .exec((error, races) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(races);
        });
});

module.exports = router;