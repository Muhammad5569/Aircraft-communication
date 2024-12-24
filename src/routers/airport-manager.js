const express = require('express');
const AirportManager = require('../models/airport-manager');

const router = express.Router();

// Get all airports
router.get('/airportManager', async (req, res) => {
    try {
        const managers = await AirportManager.find();
        res.status(200).send(managers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get airport by ID
router.get('/airportManager/:id', async (req, res) => {
    try {
        const manager = await AirportManager.findById(req.params.id);
        res.status(200).send(manager);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new airport
router.post('/airportManager', async (req, res) => {
    try {
        const manager = new AirportManager(req.body);
        res.status(201).send(manager);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Delete airport
router.delete('/airportManager:id', async (req, res) => {
    try {
        const manager = await AirportManager.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `Delete airport ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;