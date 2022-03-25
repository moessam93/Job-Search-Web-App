const Job = require('../models/Job');

const createJob = (req, res, next) => {
    const newJob = new Job({
        jobOwnerID:req.session.passport.user,
        company:req.body.company,
        jobTitle:req.body.jobTitle,
        jobType:req.body.jobType
    })
    Job.insertMany(newJob);
    res.status(201).send("Job Posted Successfully");
}

const viewJobs = (req, res, next) => {
    Job.find({}).then((jobs) => {
        res.status(200).json(jobs);
    })
}

const updateJob = async (req, res, next) => {
    const job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(201).send("Update Success");
}

const isJobOwner = async (req,res,next)=>{
    const job = await Job.findOne({_id:req.params.id});
    if (req.session.passport.user === job.jobOwnerID){
        next();
    }
    else{
        res.send("Unauthorized");
    }
    //if the req.session.passport.user === the jobOwnerID
}

module.exports = { createJob, viewJobs, updateJob, isJobOwner };