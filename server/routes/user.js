const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const { User } = require('../models/user');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { cloudinary } = require('../middleware/cloudinary');


router.get('/auth', auth, (req, res) => {
    //return res.status(500).send(new Error('Server error'));

    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        role: req.user.role
    });
});

router.post('/register', (req, res) => {
    const user = new User(req.body);
    console.log(user);
    user.save((error, doc) => {
        if (error) {
            return res.json({
                success: false,
                error
            });
        }
        //sendMail(doc.email, doc.name, null, 'welcome');
        return res.status(200).json({
            success: true
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (error, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: 'Auth failed, email not found.'
            });
        }

        user.comparePassword(req.body.password, (error, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: 'Wrong password.'
                });
            }

            user.generateToken((error, user) => {
                if (error) {
                    return res.status(400).send(error);
                }

                res.cookie('w_auth', user.token).status(200).json({ loginSuccess: true });
            });
        });
    });
});

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ "_id": req.user.id }, { token: '' }, (error, doc) => {
        if (error) {
            return res.json({
                success: false,
                error
            });
        }

        return res.status(200).send({ success: true });
    });
});

router.post('/upload-image', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        });
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    });
});

router.get('/remove-image', auth, admin, (req, res) => {
    let image_id = req.query.public_id;
    cloudinary.uploader.destroy(image_id, (error, result) => {
        //console.log('result ', result);
        //console.log('error ', error);
        if (error) {
            return res.json({ success: false, error });
        }

        res.status(200).send('ok');
    });
});

module.exports = router;