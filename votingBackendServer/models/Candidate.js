const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    accountAddress: {
        type: String,
        required: true 
    },
    imageName: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model("Candidate", CandidateSchema);
