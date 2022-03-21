const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userID:{
        type:String
    },
    contactInfo:{
        type:Object
    },
    generalInfo:{
        type:Object
    },
    workExperience:{
        type:Array
    },
    education:{
        type:Array
    },
    careerInterests:{
        type:Object
    },
    skills:{
        type:Array
    },
    languages:{
        type:Array
    },
    resume:{
        type:Object
    }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
