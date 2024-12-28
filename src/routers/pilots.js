const express = require('express')
const Pilot = require('../models/pilots')

const router = new express.Router()



router.post('/pilots', async (req, res) => {
    // const pilot = new Pilot(req.body)
    // if(!pilot) {
    //     return res.status(400).send()
    // }
    try {
        const pilot = await Pilot.create(req.body)
        //await pilot.save()
        res.status(201).send(pilot)
    } catch (error) {
        console.error("missing module", error)
        res.status(500).send(error)
    }
})
router.post('/pilots/all', async (req, res) => {
    const data = req.body
    data.forEach(async (body) => {
        const pilot = new Pilot(body)
        try {
            await pilot.save()
        } catch (error) {
            console.log(error)
        }
    })
    res.status(200).json('Success')
})
router.post('/pilots/login', async (req, res) => {
    try {
        const pilot = await Pilot.findByCredentials(req.body.login, req.body.password)
        res.send(pilot)
    } catch (error) {
        res.status(400).send()
    }
})
router.post('pilots/task', async (req, res) =>{
    // try {
    //     const tasks = await 
    // } catch (error) {
        
    // }
})
router.get('/pilots', async (req, res) => {
    try {
        const data = await Pilot.find()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})
//get by id
router.get('/pilots/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const pilot = await Pilot.findById(_id)
        if(!pilot) {
            return res.status(404).send()
        }
        res.send(pilot)
    } catch (error) {
        res.status(500).send(error)
    }
})
//update by id
router.patch('/pilots/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'login']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.status(400).send({error:'Invalid updates'})
    }
    try {
        const pilot = await Pilot.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!pilot) {
            return res.status(404).send()
        }
        res.send(pilot)
    } catch (error) {
        res.status(400).send(error)
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

