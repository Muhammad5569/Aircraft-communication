const express = require('express');
const SystemAdmin = require('../models/system-admin');
const router = express.Router();

router.post('/system-admin', async (req, res) => {
    const admin = new SystemAdmin(req.body);
    try {
        await admin.save();
        res.status(201).send(admin);
    } catch (e) {
        res.status(400).send(e);
    }
});
//get all system admin
router.get('/system-admin', async (req, res) => {
    try {
        const admins = await SystemAdmin.find({});
        res.send(admins);
    } catch (e) {
        res.status(500).send();
    }
});
//delete system admin by ID
router.delete('/system-admin/:id', async (req, res) => {
    try {
        const admin = await SystemAdmin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).send();
        }
        res.send(admin);
    } catch (e) {
        res.status(500).send();
    }
});
module.exports = router;