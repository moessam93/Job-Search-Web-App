const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'user must have an email']
  },
  firstName: {
    type: String,
    required: [true, 'user must have a first name']
  },
  lastName: {
    type: String,
    required: [true, 'user must have a last name']
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  accountType:{
    type:String,
    required: true,
    enum:["Job Seeker","Recruiter"]
  }
});

module.exports = mongoose.model('User', userSchema);
