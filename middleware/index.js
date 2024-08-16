const jwt = require('jsonwebtoken');
const User = require('../app/auth/model');
const { getToken } = require('../helper');

const decodeToken = async (req, res, next) => {
    const token = getToken(req);
    if (token) {
        const user = await User.findOne({ token: { $in: [token] } });
        if (!user) {
            return next()
        }
        jwt.verify(token, "techknical-test", (err, decoded) => {
            if (err) {
                return next()
            }
            req.user = decoded;
            return next();
        });
    } else {
        next();
    }
}

module.exports = {
    decodeToken
}