const authController = require('./controller');
const express = require('express');
const router = express.Router();
const LocalStrateggy = require('passport-local').Strategy;
const passport = require('passport');


passport.use(new LocalStrateggy({ usernameField: "email" }, authController.localStrateggy));
router.get('/users', authController.getUsers);
router.get('/users/:id', authController.getUser);
router.get('/addusers', authController.addUsers);
router.get('/me', authController.me);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.put('/users/:id', authController.updateUser);
router.delete('/users/:id', authController.destroy);

module.exports = router;