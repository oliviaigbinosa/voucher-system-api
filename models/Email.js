import mongoose from 'mongoose'

const emailSchema = new mongoose.Schema({
  recipientEmail: { type: String, required: true, lowercase: true },
  senderEmail: { type: String, required: true, lowercase: true },
  senderName: { type: String },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  html: { type: String },
  type: { 
    type: String, 
    enum: ['voucher', 'invite', 'leave-request', 'leave-status', 'voucher-status'],
    required: true 
  },
  relatedId: { type: String }, // ID of related voucher, leave request, etc.
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Email', emailSchema)
