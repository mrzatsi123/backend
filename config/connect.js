// Importing Mongoose
const mongoose = require ('mongoose');

// Connecting to the MongoDB database named 'eventDB' running on localhost at port 27017
mongoose.connect('mongodb://127.0.0.1:27017/eventDB')
    .then(
        () => {
            console.log('connected to database'); // Logging a message if the connection is successful
        }
    )
    .catch(
        (err) => {
            console.log(err); // Logging any errors that occur during connection
        }
    );

// Exporting the Mongoose instance
module.exports = mongoose;
