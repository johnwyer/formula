const express = require('express');
const router = express.Router();
const { Track } = require('../models/track');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { cloudinary } = require('../middleware/cloudinary');

router.post('/add', auth, admin, (req, res) => {
    const track = new Track(req.body);

    track.save((error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        }

        res.status(200).json({
            success: true,
            track: doc
        });
    });
});

router.get('/tracks', (req, res) => {
    Track.find({})
        .populate('countries')
        .exec((error, tracks) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(tracks);
        });
});

router.get('/get-by-id', auth, admin, (req, res) => {
    Track.findOne({ '_id': req.query.id })
        .populate('country')
        .exec((error, track) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.send(track);
        });
});

router.post('/delete', auth, admin, (req, res) => {
    Track.findOneAndRemove({ _id: req.body.id }, (error, track) => {
        if (error) {
            return res.status(400).send(error);
        }

        if (track.trackConfiguration.length !== 0) {
            track.trackConfiguration.forEach((item) => {
                cloudinary.uploader.destroy(item.public_id, (result) => {
                    console.log(item.public_id, result);
                });
            });
        }

        if (track.trackImage.length !== 0) {
            track.trackImage.forEach((item) => {
                cloudinary.uploader.destroy(item.public_id, (result) => {
                    console.log(item.public_id, result);
                });
            });
        }

        Track.find({}, (error, tracks) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(tracks);
        });
    });
});

router.post('/update', auth, admin, (req, res) => {
    Track.findOneAndUpdate({ _id: req.body.id }, { "$set": req.body }, { new: true }, (error, track) => {
        if (error) {
            return res.json({ success: false, error });
        }

        res.status(200).json({
            success: true,
            track
        });
    });
});

module.exports = router;