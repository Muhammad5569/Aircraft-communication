const mongoose = require('mongoose');

const aircraftSchema = new mongoose.Schema({
    // aircraft_type	VARCHAR 	Aircraft model/type.
    aircraft_type: {
        type: String,
        required: true
    },
    // airline	        VARCHAR	    Name or code of the airline.
    airline: {
        type: String,
        required: true
    },
    // seat_capacity	INT	        Number of seats available on the aircraft.
    seat_capacity: {
        type: Number,
        required: true
    },
    // status	        VARCHAR	    Aircraft status (e.g., available, in maintenance).
    status: {
        type: String,
        required: true
    }
});

const Aircraft = mongoose.model('Aircraft', aircraftSchema);
module.exports = Aircraft;