const express   = require('express');
const AtcManager = require('../models/atc-manager');

const router = express.Router();

router.get('/atcManager', async (req, res) => {
    try {
        const managers = await AtcManager.find({});
        res.send(managers);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/atcManager', async (req, res) => {
    const manager = new AtcManager(req.body);
    try {
        await manager.save();
        res.status(201).send(manager);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get atc by ID
router.get('/atcManager/:id', async (req, res) => {
    try {
        const manager = await AtcManager.findById(req.params.id);
        if (!manager) {
            return res.status(404).send();
        }
        res.send(manager);
    } catch (e) {
        res.status(500).send();
    }
});

// Delete atc by ID
router.delete('/atcManager/:id', async (req, res) => {
    try {
        const manager = await AtcManager.findByIdAndDelete(req.params.id);
        if (!manager) {
            return res.status(404).send();
        }
        res.send(manager);
    } catch (e) {
        res.status(500).send();
    }
});
module.exports = router;