const express = require('express');
const Flight = require('../models/flight');
const Aircraft = require('../models/aircraft');

const router = express.Router();
router.post('/flights', async (req, res) => {
    try {
        const aircraft = await Aircraft.findById(req.body.aircraftId);
        if (!aircraft) {
            return res.status(404).send({ error: 'Aircraft not found' });
        }

        const flight = new Flight({
            ...req.body,
            aircraft: req.body.aircraftId
        });
        await flight.save();
        res.status(201).send(flight);
    } catch (e) {
        res.status(400).send(e);
    }
});
router.post('/flights/all', async (req, res) => {
    const data = req.body;
    data.forEach(async (body) => {
        const flight = new Flight(body);
        try {
            await flight.save();
        } catch (error) {
            console.log(error);
        }
    })
    res.status(200).json('Success');
});
//update existing flight details
router.patch('/flights/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['flight_number', 'departure_airport', 'arrival_airport', 'departure_time', 'arrival_time', 'duration', 'status', 'price', 'aircraft'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).send();
        }

        updates.forEach((update) => flight[update] = req.body[update]);
        await flight.save();
        res.send(flight);
    } catch (e) {
        res.status(400).send(e);
    }
});

//add missing flight details
router.put('/flights/:id', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).send();
        }

        // Merge existing and new data
        const updatedFlight = { ...flight.toObject(), ...req.body };
        const result = await Flight.findByIdAndUpdate(
            req.params.id, 
            updatedFlight, 
            { new: true, runValidators: true, overwrite: true }
        ); 
        res.send(result);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/flights', async (req, res) => {
    try {
        const flights = await Flight.find({}).populate('aircraft');
        res.send(flights);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/flights/:id', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id).populate('aircraft');
        if (!flight) {
            return res.status(404).send();
        }
        res.send(flight);
    } catch (e) {
        res.status(500).send();
    }
});
//delete flight by id
router.delete('/flights/:id', async (req, res) => {
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);
        if (!flight) {
            return res.status(404).send();
        }
        res.send(flight);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;