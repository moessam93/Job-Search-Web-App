const express = require('express');
const router = express.Router();
const {createUser,viewProfile,updateProfile, applyToJob} = require('../controllers/users');
const passport = require('passport');
const {isAuth} = require('../config/passport');

router.route('/register').post(createUser);

router.route('/profile').get(isAuth,viewProfile);

router.route('/profile/update/').patch(isAuth,updateProfile);

router.route('/jobs/apply/:id').patch(isAuth,applyToJob);

router.route('/login').post(passport.authenticate('local',{failureRedirect:'/login-failure',successRedirect:'/login-success'}));

router.route('/logout').get((req,res,next)=>{
    req.logout();
    res.send("User Logged Out");
});

router.route('/login-success').get((req,res,next)=>{
    res.send("User Successfully Logged In");
});

router.route('/login-failure').get((req,res,next)=>{
    res.send('<p>Wrong email or password</p>');
});

module.exports = router;