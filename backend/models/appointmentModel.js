import mongoose, { mongo } from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  docId: {
    type: String,
    required: true
  },
  slotDate: {
    type: String,
    required: true
  },
  slotTime: {
    type: String,
    required: true
  },
  userData: {
    type: Object,
    required: true
  },
  docData: {
    type: Object,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  payment: {
    type: Boolean,
    default: false
  },
  paymentOrderId: {
    type: String,
    default: ''
  },
  paymentId: {
    type: String,
    default: ''
  },
  paymentSignature: {
    type: String,
    default: ''
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

const appointmentModel = mongoose.model('appointment', appointmentSchema)

export default appointmentModel
