const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

// Регистрация
router.post('/register', async (req, res) => {
    const { login, password } = req.body
    try {
        const existingUser = await User.findOne({ login })
        if (existingUser) {
            return res.status(400).json({ message: 'Логин уже занят' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ login, password: hashedPassword })
        await newUser.save()

        res.status(201).json({ message: 'Пользователь создан' })
    } catch (err) {
        console.error('Ошибка при регистрации:', err)
        res.status(500).json({ message: err.message || 'Ошибка регистрации' })
    }
})

// Логин
router.post('/login', async (req, res) => {
    const { login, password } = req.body
    try {
        const user = await User.findOne({ login })
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        })

        res.json({ token, user: { id: user._id, login: user.login } })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка авторизации' })
    }
})

module.exports = router
