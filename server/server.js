const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const cloudinary = require('cloudinary');
//const formidable = require('express-formidable');
//const proxy = require('http-proxy-middleware');
//const SHA1 = require('crypto-js/sha1');
//const moment = require('moment');

//const multer = require('multer');

const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const siteRoutes = require('./routes/site/');
require('dotenv').config();

//const fs = require('fs');
//const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        //require('./mocks')();
    });
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('client/build'));

app.use('/api/users', routes.user);
app.use('/api/team', routes.team);
app.use('/api/track', routes.track);
app.use('/api/driver', routes.driver);
app.use('/api/calendar', routes.calendar);
app.use('/api/result', routes.result);
app.use('/api/data', routes.data);

app.use('/site/team', siteRoutes.team);
app.use('/site/driver', siteRoutes.driver);
app.use('/site/calendar', siteRoutes.calendar);
app.use('/site/result', siteRoutes.result);

//user routes
/*
let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './client/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png is allowed'), false);
        }

        cb(null, true);
    }
});

const upload = multer({
    storage: storage
}).single('file');

app.post('/api/users/uploadfiles', auth, admin, (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            return res.json({ success: false, error });
        }

        return res.json({ success: true, file: req.file.filename });
    });
});
*/

//default
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 3011;
console.log('port ', port);
app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});