/**
 * @swagger
 * /pilots:
 *   post:
 *     summary: Create a new pilot
 *     tags: [Pilots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Pilot's name
 *                 example: John Doe
 *               age:
 *                 type: number
 *                 description: Pilot's age
 *                 example: 30
 *               role:
 *                 type: string
 *                 description: Pilot's role
 *                 example: Captain
 *               airways:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Airways name
 *                     example: Delta
 *                   address:
 *                     type: string
 *                     description: Airways address
 *                     example: 123 Main St
 *               phone:
 *                 type: number
 *                 description: Pilot's phone number
 *                 example: 1234567890
 *               email:
 *                 type: string
 *                 description: Pilot's email
 *                 example: example@mail.com
 *               login:
 *                 type: string
 *                 description: Pilot's login
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: Pilot's password
 *                 example: password123
 *     responses:
 *       201:
 *         description: Pilot created successfully
 *       500:
 *         description: Server error
 * 
 *   get:
 *     summary: Get test data
 *     tags: [Pilots]
 *     responses:
 *       200:
 *         description: Returns test data object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     hello:
 *                       type: string
 * 
 * /pilots/login:
 *   post:
 *     summary: Login a pilot
 *     tags: [Pilots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 description: Pilot's login
 *               password:
 *                 type: string
 *                 description: Pilot's password
 *     responses:
 *       200:
 *         description: Returns pilot data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pilot'
 *       400:
 *         description: Invalid credentials
 */
const express = require('express')
const Pilot = require('../models/pilots')

const router = new express.Router()



router.post('/pilots', async (req, res) => {
    const pilot = new Pilot(req.body)

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
        const data = req.body;
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router

