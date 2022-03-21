const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/users');
const passport = require('passport');

router.route('/register').post(createUser);
router.route('/login').post(passport.authenticate('local',{failureRedirect:'/login-failure',successRedirect:'/login-success'}));
router.route('/logout').get((req,res,next)=>{
    req.logout();
});

router.route('/login-success').get((req,res,next)=>{
    res.send("User Successfully Logged In");
});

router.route('/login-failure').get((req,res,next)=>{
    res.send('<p>Wrong email or password</p>');
});

module.exports = router;