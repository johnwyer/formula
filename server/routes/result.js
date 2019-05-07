const express = require('express');
const router = express.Router();
const { Race } = require('../models/race');
const { Result } = require('../models/result');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
//const { cloudinary } = require('../middleware/cloudinary');

router.get('/results', async(req, res) => {
    Race.aggregate([{
            $lookup: {
                from: "results",
                localField: "_id",
                foreignField: "race",
                as: "result"
            }
        },
        {
            $lookup: {
                from: "countries",
                localField: "country",
                foreignField: "_id",
                as: "country"
            }
        },
        {
            $unwind: '$country'
        }
    ]).exec(function(error, results) {
        if (error) {
            return res.status(400).send(error);
        } else {
            return res.status(200).send(results);
        }
    });
});

router.get('/get', auth, admin, (req, res) => {
    Result.findOne({ 'race': req.query.id })
        .populate({ path: 'position_1.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_2.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_3.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_4.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_5.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_6.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_7.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_8.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_9.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_10.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_11.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_12.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_13.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_14.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_15.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_16.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_17.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_18.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_19.driver', select: 'id firstName lastName' })
        .populate({ path: 'position_20.driver', select: 'id firstName lastName' })
        .exec((error, result) => {
            if (error) {
                return res.status(400).send(error);
            } else {
                return res.send(result);
            }
        });
});

router.post('/add', auth, admin, (req, res) => {
    const result = new Result(req.body);

    result.save((error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        } else {
            return res.status(200).json({
                success: true,
                result: doc
            });
        }
    });
});

router.post('/update', auth, admin, (req, res) => {
    Result.findOneAndUpdate({ race: req.body.race }, { "$set": req.body }, { new: true }, (error, doc) => {
        if (error) {
            return res.json({ success: false, error });
        } else {
            return res.status(200).json({
                success: true,
                result: doc
            });
        }
    });
});

router.post('/delete', auth, admin, (req, res) => {
    Result.findOneAndRemove({ race: req.body.id }, (error, result) => {
        if (error) {
            return res.status(400).send(error);
        }

        Race.aggregate([{
                $lookup: {
                    from: "results",
                    localField: "_id",
                    foreignField: "race",
                    as: "result"
                }
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "_id",
                    as: "country"
                }
            },
            {
                $unwind: '$country'
            }
        ]).exec(function(error, results) {
            if (error) {
                return res.status(400).send(error);
            } else {
                return res.status(200).send(results);
            }
        });
    });
});

module.exports = router;