const mongoose = require('mongoose')

const TruckSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['Heavy', 'Light', 'Transport', 'Van', 'Cistern'],
        required: true,
    },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String }, // путь к картинке
})

module.exports = mongoose.model('Truck', TruckSchema)
