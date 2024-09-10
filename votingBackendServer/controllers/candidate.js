const Candidate = require('../models/Candidate');
const express = require('express')

exports.CandidateData = async (req, res) => {
    try {
       
        const {accountAddress} = req;
        const imageName = req.file.filename;

        // Create a new candidate document
        const candidate = await Candidate.create({ accountAddress, imageName });
        console.log(candidate);
        // Return a success response
        return res.status(201).json({
            success: true,
            candidate,
            message: "Candidate data uploaded successfully"
        });
    } catch (error) {
        console.error('Error in CandidateData controller:', error.message);
        // Return an error response
        return res.status(500).json({
            success: false,
            message: "Failed to upload candidate data",
            error: error.message
        });
    }
};
