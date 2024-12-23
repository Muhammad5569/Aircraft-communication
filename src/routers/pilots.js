const express = require('express')
const Pilot = require('../models/pilots')

const router = new express.Router()

router.post('/pilots', async (req, res) => {
    const pilot = new Pilot(req.body)

    try {
        await pilot.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

