const express = require('express')
const router = express.Router()
const Truck = require('../models/Truck')
const authenticated = require('../middleware/authenticated')
const hasRole = require('../middleware/hasRole')

router.get('/', async (req, res) => {
    try {
        const trucks = await Truck.find()
        res.json(trucks)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении грузовиков' })
    }
})

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

router.put(
    '/:id',
    authenticated,
    hasRole(['admin', 'moderator']),
    async (req, res) => {
        const { name, type, price, description, image } = req.body
        try {
            const updatedTruck = await Truck.findByIdAndUpdate(
                req.params.id,
                { name, type, price, description, image },
                { new: true }
            )

            if (!updatedTruck) {
                return res.status(404).json({ message: 'Грузовик не найден' })
            }

            res.json(updatedTruck)
        } catch (err) {
            res.status(500).json({ message: 'Ошибка при обновлении грузовика' })
        }
    }
)

module.exports = router
