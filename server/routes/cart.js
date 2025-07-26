const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Truck = require('../models/Truck')

// Добавить в корзину
router.post('/add', async (req, res) => {
    const { userId, truckId } = req.body

    try {
        const user = await User.findById(userId)
        if (!user)
            return res.status(404).json({ message: 'Пользователь не найден' })

        const itemIndex = user.cart.findIndex(
            (item) => item.truckId.toString() === truckId
        )

        if (itemIndex >= 0) {
            user.cart[itemIndex].quantity += 1
        } else {
            user.cart.push({ truckId, quantity: 1 })
        }

        await user.save()
        res.json(user.cart)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при добавлении в корзину' })
    }
})

// Получить корзину
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate(
            'cart.truckId'
        )
        if (!user)
            return res.status(404).json({ message: 'Пользователь не найден' })

        res.json(user.cart)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при получении корзины' })
    }
})

// Удалить из корзины
router.post('/remove', async (req, res) => {
    const { userId, truckId } = req.body

    try {
        const user = await User.findById(userId)
        if (!user)
            return res.status(404).json({ message: 'Пользователь не найден' })

        user.cart = user.cart.filter(
            (item) => item.truckId.toString() !== truckId
        )
        await user.save()
        res.json(user.cart)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при удалении из корзины' })
    }
})

module.exports = router
