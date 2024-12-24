const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
// flight_number	VARCHAR	Airline-specific flight number.
    flight_number: {
        type: String,
        required: true
    },
// airline	VARCHAR	Name or code of the airline.
    airline: {
        type: String,
        required: true
    },
// departure_airport	VARCHAR	IATA/ICAO code of the departure airport.
    departure_airport: {
        type: String,
        required: true
    },
// arrival_airport	VARCHAR	IATA/ICAO code of the arrival airport.
    arrival_airport: {
        type: String,
        required: true
    },
// departure_time	DATETIME	Scheduled departure time.
    departure_time: {
        type: Date,
        required: true
    },
// arrival_time	DATETIME	Scheduled arrival time. 
    arrival_time: {
        type: Date,
        required: true
    },
// duration	TIME	Duration of the flight. 
    duration: {
        type: Date,
        required: true
    },
// status	VARCHAR	Flight status (e.g., scheduled, delayed).
    status: {
        type: String,
        required: true
    },
// aircraft from aircraft model
    aircraft: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aircraft',
        required: true
    },
// price	DECIMAL(10, 2)	Price of the flight ticket.
    price: {
        type: Number,
        required: true
    }
})


const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;