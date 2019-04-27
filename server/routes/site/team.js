const express = require('express');
const router = express.Router();
const { Team } = require('../../models/team');

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

module.exports = router;