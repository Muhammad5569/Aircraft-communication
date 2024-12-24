const express = require('express');
const FlightManager = require('../models/flight-manager');

const router = express.Router();

router.post('/flightManager', async (req, res) => {
    try {
        const flight = new FlightManager(req.body);
        await flight.save();
        res.status(201).send(flight);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/flightManager', async (req, res) => {
    try {
        const flights = await FlightManager.find({});
        res.send(flights);
    } catch (e) {
        res.status(500).send();
    }
});

// Get flight by ID
router.get('/flightManager/:id', async (req, res) => {
    try {
        const flight = await FlightManager.findById(req.params.id);
        if (!flight) {
            return res.status(404).send();
        }
        res.send(flight);
    } catch (e) {
        res.status(500).send();
    }
});

//delete flight by ID
router.delete('/flightManager/:id', async (req, res) => {
    try {
        const flight = await FlightManager.findByIdAndDelete(req.params.id);
        if (!flight) {
            return res.status(404).send();
        }
        res.send(flight);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;