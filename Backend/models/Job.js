const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobOwnerID:{
        type:String,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true,
        enum:["Full-Time","Part-Time","Project","Freelance"]
    },
    company:{
        type:String,
        required:true
    },
    postedAt:{
        type:Date,
        default:Date.now()
    },
    applicants:{
        type:Array
    }
});

module.exports = mongoose.model('Job',jobSchema);