import Doctor from '../models/doctorModel.js'
import Appointment from '../models/appointmentModel.js'
import jwt from 'jsonwebtoken'
import cloudinary from '../config/cloudinary.js'

// Change doctor availability
export const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availability Changed' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get list of all doctors
export const doctorList = async (req, res) => {
    try {
        // Changed isAvailable to available to match the schema
        const doctors = await Doctor.find({ available: true }).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Doctor login
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await Doctor.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' })
        }

        const isMatch = await doctor.comparePassword(password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        res.json({ success: true, message: 'Login successful', token })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get doctor profile
export const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.doctor._id)
        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' })
        }
        res.json({ success: true, doctorData: doctor })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get doctor's appointments
export const getDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findById( req.doctor._id )
            .populate('userId', 'name email phone image')
            .populate('doctorId', 'name specialization fees image')
        res.json({ success: true, appointments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Cancel appointment
export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await Appointment.findById(appointmentId)

        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        if (appointment.doctorId.toString() !== req.doctor._id.toString()) {
            return res.json({ success: false, message: 'Unauthorized' })
        }

        appointment.cancelled = true
        await appointment.save()

        res.json({ success: true, message: 'Appointment cancelled successfully' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get doctor dashboard data
export const getDoctorDashboard = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.doctor._id })
        const totalAppointments = appointments.length
        const totalPatients = new Set(appointments.map(apt => apt.userId.toString())).size
        const totalEarnings = appointments
            .filter(apt => !apt.cancelled)
            .reduce((sum, apt) => sum + apt.amount, 0)

        const dashData = {
            totalAppointments,
            totalPatients,
            totalEarnings,
            recentAppointments: appointments.slice(-5)
        }

        res.json({ success: true, dashData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}