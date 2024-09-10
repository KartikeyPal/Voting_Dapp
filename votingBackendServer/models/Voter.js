const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
    accountAddress: {
        type: String,
        required: true 
    },
    imageName: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model("Voter", VoterSchema);
