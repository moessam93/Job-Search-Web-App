const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const validPassword = require('../lib/passwordUtils').validPassword;
const User = require('../models/User');
//const User = connection.models.User;

const customFields = {
    usernameField:'email',
    passwordField:'password'
}

const verifyCallback = (email,password,done)=>{
    User.findOne({email:email}).then((user)=>{
        if (!user){
            return done(null,false);
        }
        const isValid = validPassword(password,user.hash,user.salt);

        if (isValid){
            return done(null,user);
        }
        else {
            return done(null,false);
        }
    }).catch((err)=>done(err));
}

const strategy = new LocalStrategy(customFields,verifyCallback);

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
    User.findById(userId).then((user)=>done(null,user)).catch((err)=>done(err));
});
