const Voter = require('../models/Voter');

exports.VoterData = async (req, res) => {
    try {
        //fetch data
        const {accountAddress} = req;
        const imageName = req.file.filename;
        

        if (typeof accountAddress !== 'string') {
            throw new Error('Invalid accountAddress format');
        }

        // Create a new candidate document
        const voter = await Voter.create({ accountAddress, imageName });
        // Return a success response
        return res.status(201).json({
            success: true,
            voter,
            message: "Voter data uploaded successfully"
        });
    } catch (error) {
        console.error('Error in VoterData controller:', error.message);
        // Return an error response
        return res.status(500).json({
            success: false,
            message: "Failed to upload Voter data",
            error: error.message
        });
    }
};
