const User = require('./model');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const { getToken } = require('../../helper');
const dataDummy = require("./dataDummy");
const Order = require('../orders/model');

const localStrateggy = async (email, password, done) => {
    const inputPw = password;
    try {
        const user = await User.findOne({ email: email }).select('-token -createdAt -updatedAt -address -phone_number -__v ').select('+password');
        if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        if (user.password !== inputPw) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        const { password, ...userWhithOutPassword } = user.toJSON()
        return done(null, userWhithOutPassword);
    } catch (error) {
        return done(error);
    }
}

const register = async (req, res, next) => {
    try {
        const payload = req.body;
        const user = new User(payload);
        const result = await user.save();
        res.status(201).json({ user: result, status: 201 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById({ _id: id }).select('-token -createdAt -updatedAt -__v ');
        res.status(200).json({ user, status: 200 });
    } catch (error) {
        return next(error);
    }
}

const addUsers = async (req, res, next) => {
    try {
        const user = await User.insertMany(dataDummy);
        res.status(201).json({ user: user, status: 201 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
}

const login = async (req, res, next) => {
    passport.authenticate('local', async (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const signed = jwt.sign(user, "techknical-test");
        try {
            await User.findByIdAndUpdate({ _id: user._id }, { $push: { token: signed } });
            return res.status(200).json({ user, token: signed, status: 200 });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}

const logout = async (req, res, next) => {
    const token = getToken(req);
    try {
        await User.findOneAndUpdate({ token: token }, { $pull: { token: token } });
        return res.status(200).json({ message: 'Logout success', status: 200 });
    } catch (error) {
        return next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-token -createdAt -updatedAt -__v ');
        res.status(200).json({ users, status: 200 })
    } catch (error) {
        return next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const payload = req.body;
        const { id } = req.params;
        const user = await User.findByIdAndUpdate({ _id: id }, payload, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user, status: 200 });
    } catch (error) {
        return next(error);
    }
}

const me = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'token expired', status: 401 });
        }
        return res.status(200).json({ user: req.user, status: 200 });
    } catch (error) {
        return next(error);
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete({ _id: id });
        await Order.deleteMany({ user: id });
        return res.status(200).json({ message: 'User deleted', status: 200 });
    } catch (error) {
        return next(error);
    }
}





module.exports = {
    localStrateggy,
    register,
    login,
    logout,
    me,
    updateUser,
    getUsers,
    getUser,
    addUsers,
    destroy
}