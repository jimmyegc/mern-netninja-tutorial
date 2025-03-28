import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import mongoose from 'mongoose'
mongoose.connect(process.env.MONGODB_URI)  
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => { 
    console.log(error.message)
  })


import workoutsRouter from './routes/workouts.js'

// express app
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
// middleware 
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.use('/api/workouts', workoutsRouter)

// listen for requests
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port)
});

