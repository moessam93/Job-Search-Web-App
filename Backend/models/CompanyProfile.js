const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    companyWebsite:{
        type:String
    },
    industry:{
        type:String
    },
    noEmployees:{
        type:String
    },
    location:{
        type:String
    },
    vaccancies:{
        type:Array
    }
});

module.exports = mongoose.model('CompanyProfile',companyProfileSchema);