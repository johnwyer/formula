const express = require('express');
const router = express.Router();
const { Driver } = require('../models/driver');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { cloudinary } = require('../middleware/cloudinary');

router.post('/add', auth, admin, (req, res) => {
    const driver = new Driver(req.body);

    driver.save((error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        }

        res.status(200).json({
            success: true,
            driver: doc
        });
    });
});

router.get('/drivers', (req, res) => {
    Driver.find({}, (error, drivers) => {
        if (error) {
            return res.status(400).send(error);
        }

        res.status(200).send(drivers);
    });
});

router.get('/get-by-id', auth, admin, (req, res) => {
    Driver.findOne({ '_id': req.query.id })
        .populate('country')
        .exec((error, driver) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.send(driver);
        });
});

router.post('/delete', auth, admin, (req, res) => {
    Driver.findOneAndRemove({ _id: req.body.id }, (error, driver) => {
        if (error) {
            return res.status(400).send(error);
        }

        if (driver.driverImage.length !== 0) {
            driver.driverImage.forEach((item) => {
                cloudinary.uploader.destroy(item.public_id, (result) => {
                    console.log(item.public_id, result);
                });
            });
        }

        if (driver.driverHelmetImage.length !== 0) {
            driver.driverHelmetImage.forEach((item) => {
                cloudinary.uploader.destroy(item.public_id, (result) => {
                    console.log(item.public_id, result);
                });
            });
        }

        Driver.find({}, (error, drivers) => {
            if (error) {
                return res.status(400).send(error);
            }

            res.status(200).send(drivers);
        });
    });
});

router.post('/update', auth, admin, (req, res) => {
    Driver.findOneAndUpdate({ _id: req.body.id }, { "$set": req.body }, { new: true }, (error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        }

        console.log(doc);

        res.status(200).json({
            success: true,
            driver: doc
        });
    });
});

module.exports = router;