const { User } = require('../models/user');

let auth = (req, res, next) => {
    let token = req.cookies.w_auth;

    User.findByToken(token, (error, user) => {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({
                isAuth: false,
                error: true
            });
        }

        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = { auth };