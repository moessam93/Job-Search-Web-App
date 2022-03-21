const DB = require('../database/connect');
const { genPassword } = require('../lib/passwordUtils');
const User = require('../models/User');

const createUser = (req, res, next) => {
    const saltHash = genPassword(req.body.password);
    const hash = saltHash.hash;
    const salt = saltHash.salt;

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hash: hash,
        salt: salt
    })
    console.log(newUser);
    User.findOne({ email: newUser.email }).then((user) => {
        if (user) {
            res.status(409).send("User Already Exists");
        }
        else {
            User.insertMany(newUser);
            res.status(201).send("User Created Successfully");
        }
    });
}

module.exports = { createUser };