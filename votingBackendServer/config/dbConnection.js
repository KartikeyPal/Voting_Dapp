const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Error in database connection:", error.message);
        process.exit(1); // Exit the process with failure
    }
};
