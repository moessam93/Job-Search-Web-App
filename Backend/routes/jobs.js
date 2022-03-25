const express = require('express');
const router = express.Router();
const {isAuth} = require('../config/passport');
const {isRecruiter} = require('../controllers/users');
const {createJob,updateJob,viewJobs, isJobOwner} = require('../controllers/jobs');

router.route('/api/jobs/').post(isAuth,isRecruiter,createJob).get(isAuth,viewJobs);
router.route('/api/jobs/:id').patch(isAuth,isJobOwner,updateJob);

module.exports = router;