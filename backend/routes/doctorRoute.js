import express from 'express'
import { changeAvailability, doctorList, loginDoctor, getDoctorProfile, getDoctorAppointments, cancelAppointment, getDoctorDashboard } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

// Public routes
doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)

// Protected routes
doctorRouter.get('/profile', authDoctor, getDoctorProfile)
doctorRouter.get('/appointments', authDoctor, getDoctorAppointments)
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment)
doctorRouter.get('/dashboard', authDoctor, getDoctorDashboard)
doctorRouter.post('/change-availability', authDoctor, changeAvailability)

export default doctorRouter