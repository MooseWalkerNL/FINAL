const express = require('express')
const router = express.Router()
const Truck = require('../models/Truck')

// Получить все грузовики
router.get('/', async (req, res) => {
    try {
        const trucks = await Truck.find()
        res.json(trucks)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении грузовиков' })
    }
})

// Добавить грузовик
router.post('/', async (req, res) => {
    const { name, type, price, description, image } = req.body

    try {
        const truck = new Truck({ name, type, price, description, image })
        await truck.save()
        res.status(201).json(truck)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при добавлении' })
    }
})

module.exports = router
