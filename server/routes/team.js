const express = require('express');
const router = express.Router();
const { Team } = require('../models/team');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { cloudinary } = require('../middleware/cloudinary');

router.post('/add', auth, admin, (req, res) => {
    const team = new Team(req.body);

    team.save((error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        }

        res.status(200).json({
            success: true,
            team: doc
        });
    });
});

router.get('/teams', (req, res) => {
    Team.find({}, (error, races) => {
        if (error) {
            return res.status(400).send(error);
        }

        res.status(200).send(races);
    });
});

router.get('/get-by-id', auth, admin, (req, res) => {
    Team.findOne({ '_id': req.query.id })
        .populate('country')
        .populate({ path: 'driver_1', select: 'id firstName lastName' })
        .populate({ path: 'driver_2', select: 'id firstName lastName' })
        .exec((error, race) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.send(race);
        });
});

router.post('/delete', auth, admin, (req, res) => {
    Team.findOneAndRemove({ _id: req.body.id }, (error, team) => {
        if (error) {
            return res.status(400).send(error);
        }

        if (team.teamLogo.length !== 0) {
            team.teamLogo.forEach((item) => {
                cloudinary.uploader.destroy(item.public_id, (result) => {
                    console.log(item.public_id, result);
                });
            });
        }

        Team.find({}, (error, races) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(races);
        });
    });
});

router.post('/update', auth, admin, (req, res) => {
    Team.findOneAndUpdate({ _id: req.body.id }, { "$set": req.body }, { new: true }, (error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        }

        res.status(200).json({
            success: true,
            team: doc
        });
    });
});

module.exports = router;