const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/cart', require('./routes/cart'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/trucks', require('./routes/trucks'))

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(PORT, '0.0.0.0', () =>
            console.log(`Server running on port ${PORT}`)
        )
    })
    .catch((err) => console.log('Mongo error:', err))
