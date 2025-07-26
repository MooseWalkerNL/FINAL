const mongoose = require('mongoose')
const Truck = require('./models/Truck')
require('dotenv').config()

const trucks = [
    {
        name: 'Volvo FH16',
        type: 'Heavy',
        price: 150000,
        image_url:
            'https://upload.wikimedia.org/wikipedia/commons/7/73/Volvo_FH16_750_4X2.jpg',
    },
    {
        name: 'Scania R730',
        type: 'Heavy',
        price: 140000,
        image_url:
            'https://upload.wikimedia.org/wikipedia/commons/4/4c/Scania_R730_streamline.jpg',
    },
    {
        name: 'Iveco Daily',
        type: 'Van',
        price: 50000,
        image_url:
            'https://upload.wikimedia.org/wikipedia/commons/6/6c/Iveco_Daily_35S13.jpg',
    },
]

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')

        await Truck.deleteMany()
        console.log('Old trucks removed')

        await Truck.insertMany(trucks)
        console.log('New trucks added')

        mongoose.disconnect()
    } catch (err) {
        console.error('Seeding error:', err)
        mongoose.disconnect()
    }
}

seed()
