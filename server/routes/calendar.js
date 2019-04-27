const express = require('express');
const router = express.Router();
const { Race } = require('../models/race');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
//const { cloudinary } = require('../middleware/cloudinary');

router.post('/add', auth, admin, (req, res) => {
    const race = new Race(req.body);

    race.save((error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        }

        res.status(200).json({
            success: true,
            race: doc
        });
    });
});

router.get('/races', (req, res) => {
    Race.find({})
        .populate('country')
        .exec((error, races) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(races);
        });
});
/*
router.get('/races-with-results', (req, res) => {
    Race.find({})
        .populate('country')
        .populate('result')
        .populate('resultDetail')
        .exec((error, races) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(races);
        });
});
*/

router.get('/get-by-id', auth, admin, (req, res) => {
    let id = req.query.id;
    Race.findOne({ '_id': req.query.id })
        .populate('country')
        .populate('track')
        .exec((error, race) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.send(race);
        });
});

router.post('/delete', auth, admin, (req, res) => {
    Race.findOneAndRemove({ _id: req.body.id }, (error) => {
        if (error) {
            return res.status(400).send(error);
        }

        Race.find({}, (error, races) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(races);
        });
    });
});

router.post('/update', auth, admin, (req, res) => {
    Race.findOneAndUpdate({ _id: req.body.id }, { "$set": req.body }, { new: true }, (error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        }

        console.log(doc);

        res.status(200).json({
            success: true,
            race: doc
        });
    });
});

module.exports = router;