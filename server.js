// Importing required modules
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const Event = require('./models/event'); // Importing the Event model
require('./config/connect'); // Importing database connection setup
const eventRouter = require('./routers/event'); // Importing event router

// Creating an Express application
const app = express();

// Middleware to parse incoming request bodies as JSON
app.use(express.json());

// Middleware to enable CORS for all origins
app.use(cors());

// Using the event router for routes starting with '/event'
app.use('/event', eventRouter);

// Serving static files from the 'uploads' directory at the '/getimage' endpoint
app.use('/getimage', express.static('./uploads'));

// Starting the server and listening on port 3000
app.listen(3000, () => {
    console.log('Server works'); // Logging a message when the server starts
});
