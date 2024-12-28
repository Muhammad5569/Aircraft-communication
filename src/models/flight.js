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
    },
// departure_airport	VARCHAR	IATA/ICAO code of the departure airport.
    departure_airport: {
        type: String,
    },
//departure country
    departure_country: {
        type: String,
    },
// arrival_airport	VARCHAR	IATA/ICAO code of the arrival airport.
    arrival_airport: {
        type: String,
    },
//arrival country
    arrival_country: {
        type: String,
    },
// departure_time	DATETIME	Scheduled departure time.
    departure_time: {
        type: Date,
    },
// arrival_time	DATETIME	Scheduled arrival time. 
    arrival_time: {
        type: Date,
    },
// duration	TIME	Duration of the flight. 
    duration: {
        type: String,
    },
// status	VARCHAR	Flight status (e.g., scheduled, delayed).
    status: {
        type: String,
    },
// aircraft from aircraft model
    aircraft: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aircraft',
    },

// price	DECIMAL(10, 2)	Price of the flight ticket.
    price: {
        type: Number,
    },
//fuel scheduling
    fuelSchedule: {
        type: String,
    },
//crew scheduling
 cruwSchedule: {
    //pilot, co-pilot, cabin crew, crew rest period
    pilot: {
        type: String,
    },
    co_pilot: {
        type: String,
    },
    cabin_crew: {
        type: String,
    },
    crew_rest_period: {
        type: String,
    }
 },
    gruondService:{
        //runaway, gate, taxi, bus, terminal
        runaway: {
            type: String,
        },
        gate: {
            type: String,
        },
        taxi: {
            type: String,
        },
        bus: {
            type: String,
        },
        terminal: {
            type: String,
        }
    },
    //weather conditions
    weather: {
        type: String,
    },
    //cargo details
    cargoDetails: {
        type: String,
    },
    restInformation: {
        //name, address, latitude, longitude, rooms, amenities, type, status, registred pilot, duration, startTime, endTime, managedBy, managedByContact
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        },
        rooms: {
            type: String,
        },
        amenities: {
            type: String,
        },
        type: {
            type: String,
        },
        status: {
            type: String,
        },
        registred_pilot: {
            type: String,
        },
        duration: {
            type: String,
        },
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },
        managedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pilot'
        }
    }
},
{
    timestamps: true
});



const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;