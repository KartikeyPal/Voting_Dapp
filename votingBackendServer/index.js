const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Database Connection
const db = require('./config/dbConnection');
db.connectDB();

// Routes Mounting
try {
    console.log('Loading routes...');
    const route = require('./routes/routes');
    app.use("/api/v1", route);
    // Routes for fetching data in my fronend
    app.use('/votingSystem',express.static(path.join(__dirname,'votingSystem')));

    console.log('Routes loaded successfully');
} catch (error) {
    console.error('Error while loading routes:', error);
    process.exit(1); // Exit the process if there's an error loading routes
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
