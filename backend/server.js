import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

dotenv.config()
const app = express()

// Initialize Cloudinary
await connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 5000

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()