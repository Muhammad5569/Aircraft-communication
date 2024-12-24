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
router.post('/pilots/login', async (req, res) => {
    try {
        const pilot = await Pilot.findByCredentials(req.body.login, req.body.password)
        res.send(pilot)
    } catch (error) {
        res.status(400).send()
    }
})
router.get('/pilots', async (req, res) => {
    try {
        const data = req.body;
        const string = {'hello': 'world'}
        res.send({data,string })
    } catch (error) {
        res.send(error)
    }
})

module.exports = router

