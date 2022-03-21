const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bp = require('body-parser');
const usersRouter = require('./routes/users');
require('dotenv').config();
const connectDB = require('./database/connect');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = MongoStore.create({
    mongoUrl:process.env.MONGO_URI,
    mongooseConnection: connectDB,
    collection:'sessions'

});

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
        maxAge:1000*60*60*24
    }
}))

app.use(cookieParser(process.env.SECRET));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

 require('./config/passport');
 app.use(passport.initialize());
 app.use(passport.session());
 
 app.use((req,res,next)=>{
     console.log(req.session);
     console.log(req.user);
     console.log(req.session.passport);
     next();
 })
 
 //Routes
 app.use('/',usersRouter);

connectDB(process.env.MONGO_URI);
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at ${process.env.PORT}`);
})
