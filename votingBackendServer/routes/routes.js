const express = require('express');
const router = express.Router();

const { CandidateData } = require('../controllers/candidate');
const multerConfig = require('../config/multerConfig');
const { VoterData } = require('../controllers/voter');
const {authentication} = require('../middleware/authentication')
const {validation} = require('../middleware/validation')
 
// POST route for uploading candidate data
router.post('/upload/postCandidateImage',validation,multerConfig.uploadCandidate, CandidateData);
router.post('/upload/postVoterImage',validation,multerConfig.uploadVoter,VoterData)
router.post('/authentication',authentication)


module.exports = router;
    