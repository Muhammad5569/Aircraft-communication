const express = require('express')
const Pilot = require('../models/pilots')

const router = new express.Router()



router.post('/pilots', async (req, res) => {
    const pilot = new Pilot(req.body)
    if(!pilot) {
        return res.status(400).send()
    }
    try {
        await pilot.save()
        res.status(201).send(pilot)
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
        const data = await Pilot.find()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/pilots/:id', async (req, res) => {
    try {
        const pilot = await Pilot.findByIdAndDelete(req.params.id)
        if(!pilot) {
            return res.status(404).json({message:'Pilot not found'})
        }
        res.json({message:'Pilot deleted successfully'})
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router

