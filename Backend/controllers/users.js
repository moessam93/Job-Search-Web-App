const { genPassword } = require('../lib/passwordUtils');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const Job = require('../models/Job');
const CompanyProfile = require('../models/CompanyProfile');

const createUser = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.status(409).send("User Already Exists");
        }
        else {
            if (req.path === "/register") {
                const saltHash = genPassword(req.body.password);
                const hash = saltHash.hash;
                const salt = saltHash.salt;

                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    hash: hash,
                    salt: salt,
                    accountType: "Job Seeker"
                })

                User.insertMany(newUser);
                const newUserProfile = new UserProfile({
                    userID: newUser._id,
                    generalInfo: {
                        firstName: newUser.firstName,
                        lastName: newUser.lastName
                    },
                    contactInfo: { email: newUser.email }
                })
                UserProfile.insertMany(newUserProfile);
            }
            else if (req.path === "/employer/register") {
                const saltHash = genPassword(req.body.password);
                const hash = saltHash.hash;
                const salt = saltHash.salt;

                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    hash: hash,
                    salt: salt,
                    accountType: "Recruiter"
                })
                const newCompanyProfile = CompanyProfile({
                    userID: newUser._id,
                    companyName: req.body.companyName,
                    companyWebsite:req.body.companyWebsite,
                    industry:req.body.industry,
                    noEmployees:req.body.noEmployees,
                    location:req.body.location
                })
                CompanyProfile.insertMany(newCompanyProfile);
                User.insertMany(newUser);
            }
            res.status(201).send("User Created Successfully");
        }
    })
}

const viewUserProfile = (req, res, next) => {
    UserProfile.findOne({ userID: req.user._id }).then((userProfile) => {
        res.status(200).json(userProfile);
    });
}

const updateUserProfile = async (req, res, next) => {
    const profile = await UserProfile.findOneAndUpdate({ userID: req.user._id }, req.body, { new: true });
    res.status(201).send("Update Success");
}

const applyToJob = async (req, res, next) => {
    //get the job that user will apply to
    const appliedJob = await Job.findOne({ _id: req.params.id });

    //check if the user has already applied
    if (appliedJob.applicants.some(applicant => applicant.applicantID === req.session.passport.user)) {
        res.status(200).send("User Already Applied");
    }
    else {
        appliedJob.applicants.push({ applicantID: req.session.passport.user });
        const job = await Job.findOneAndUpdate({ _id: req.params.id }, appliedJob, { new: true });
        res.status(201).send("Applied");
    }
}


module.exports = { createUser, viewUserProfile, updateUserProfile, applyToJob};