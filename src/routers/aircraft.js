const express = require('express');
const Aircraft = require('../models/aircraft');

const router = express.Router();
// Create new aircraft
router.post('/aircraft', async (req, res) => {
    const aircraft = new Aircraft(req.body);
    try {
        await aircraft.save();
        res.status(201).send(aircraft);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/aircraft/all', async (req, res) => {
    const data = req.body;
    data.forEach(async (body) => {
        const aircraft = new Aircraft(body);
        try {
            await aircraft.save();
        } catch (error) {
            console.log(error);
        }
    });
    res.status(200).json('Success');
})

// Get all aircraft
router.get('/aircraft', async (req, res) => {
    try {
        const aircraft = await Aircraft.find({});
        res.send(aircraft);
    } catch (e) {
        res.status(500).send();
    }
});

// Get aircraft by id
router.get('/aircraft/:id', async (req, res) => {
    try {
        const aircraft = await Aircraft.findById(req.params.id);
        if (!aircraft) {
            return res.status(404).send();
        }
        res.send(aircraft);
    } catch (e) {
        res.status(500).send();
    }
});


// Delete aircraft by id
router.delete('/aircraft/:id', async (req, res) => {
    try {
        const aircraft = await Aircraft.findByIdAndDelete(req.params.id);
        if (!aircraft) {
            return res.status(404).send();
        }
        res.send(aircraft);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;