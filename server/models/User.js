// models/User.js
const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' },
    quantity: { type: Number, default: 1 },
})

const userSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user',
    },
})

module.exports = mongoose.model('User', userSchema)
