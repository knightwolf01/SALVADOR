import jwt from 'jsonwebtoken'
import Doctor from '../models/doctorModel.js'

const authDoctor = async (req, res, next) => {
    try {
        const token = req.headers.token
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const doctor = await Doctor.findById(decoded.id)
        
        if (!doctor) {
            return res.status(401).json({ success: false, message: 'Doctor not found' })
        }

        req.doctor = doctor
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: error.message })
    }
}

export default authDoctor