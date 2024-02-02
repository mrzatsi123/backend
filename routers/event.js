// Importing required modules
const express = require('express');
const Event = require('../models/event'); // Importing the Event model
const router = express.Router(); // Creating an Express router

// Importing multer for handling file uploads
const multer = require('multer');

// Initializing filename variable for storing uploaded file names
let filename = '';

// Configuring multer storage
const mystorage = multer.diskStorage({
    destination: './uploads', // Destination directory for storing uploaded files
    filename: (req, file, redirect) => {
        // Generate a unique filename based on the current date and file mimetype
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1]; // Used this to get the image extension
        redirect(null, fl); // Callback to set the filename
        filename = fl; // Storing the filename in the global variable
    }
});

// Creating multer instance with configured storage
const upload = multer({ storage: mystorage });

// POST request to add a new event with image upload support
router.post('/add', upload.any('image'), async (req, res) => {
    try {
        // Extracting event data from the request body
        data = req.body;
        // Creating a new Event instance with the extracted data
        _event = new Event(data);
        // Assigning the uploaded image filename to the event
        _event.image = filename;
        // Saving the event to the database
        savedEvent = await _event.save();
        // Resetting the filename variable
        filename = '';
        // Sending the saved event as a response
        res.status(200).send(savedEvent);
    } catch (error) {
        // Handling errors and sending an error response
        res.status(400).send(error);
    }
});

// GET request to fetch all events
router.get('/all', async (req, res) => {
    try {
        // Finding all events in the database
        _events = await Event.find();
        // Sending the found events as a response
        res.status(200).send(_events);
    } catch (error) {
        // Handling errors and sending an error response
        res.status(400).send(error);
    }
});

// GET request to fetch an event by ID
router.get('/getbyid/:id', async (req, res) => {
    try {
        // Extracting the event ID from the request parameters
        myId = req.params.id;
        // Finding the event by ID in the database
        _event = await Event.findById({ _id: myId });
        // Sending the found event as a response
        res.status(200).send(_event);
    } catch (error) {
        // Handling errors and sending an error response
        res.status(400).send(error);
    }
});

// DELETE request to delete an event by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        // Extracting the event ID from the request parameters
        const myId = req.params.id;
        // Finding the event by ID in the database
        const deletedEvent = await Event.findByIdAndDelete({ _id: myId });
        
        // If an event is found and it has an associated image filename
        if (deletedEvent && deletedEvent.image) {
            // Delete the corresponding image file from the storage
            const fs = require('fs');
            const imagePath = './uploads/' + deletedEvent.image;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                } else {
                    console.log('Image file deleted successfully');
                }
            });
        }

        // Sending the deleted event as a response
        res.status(200).send(deletedEvent);
    } catch (error) {
        // Handling errors and sending an error response
        res.status(400).send(error);
    }
});

// PUT request to update an event with image upload support
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        // Extracting the event ID from the request parameters
        const myId = req.params.id;
        // Extracting the new event data from the request body
        const newEventData = req.body;
        // Checking if a new image is uploaded
        if (req.file) {
            // Assigning the uploaded image filename to the event data
            newEventData.image = filename;
        }
        // Updating the event in the database with the new data
        const updatedEvent = await Event.findByIdAndUpdate({ _id: myId }, newEventData);
        // Resetting the filename variable
        filename = '';
        // Sending the updated event as a response
        res.status(200).send(updatedEvent);
    } catch (error) {
        // Handling errors and sending an error response
        res.status(400).send(error);
    }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
