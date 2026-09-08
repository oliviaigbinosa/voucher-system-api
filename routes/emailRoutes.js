import express from 'express'
import { sendInviteEmail, sendVoucherEmail, sendApprovedCcEmail } from '../controllers/emailController.js'
import Email from '../models/Email.js'

const router = express.Router()

router.post('/email/send-invite', sendInviteEmail)
router.post('/email/send-voucher', sendVoucherEmail)
router.post('/email/send-approved-cc', sendApprovedCcEmail)

// Get emails for the authenticated user
router.get('/email/inbox', async (req, res) => {
  try {
    const { email } = req.query
    console.log('Inbox fetch request for email:', email)
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const normalizedEmail = email.toLowerCase()
    const emails = await Email.find({ recipientEmail: normalizedEmail })
      .sort({ createdAt: -1 })
    
    console.log('Found emails for', normalizedEmail, ':', emails.length)
    console.log('Email IDs:', emails.map(e => e._id))
    
    res.json({ emails })
  } catch (error) {
    console.error('Failed to fetch inbox:', error)
    res.status(500).json({ error: 'Failed to fetch inbox' })
  }
})

// Mark email as read
router.patch('/email/:id/read', async (req, res) => {
  try {
    const email = await Email.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    )
    
    if (!email) {
      return res.status(404).json({ error: 'Email not found' })
    }
    
    res.json({ email })
  } catch (error) {
    console.error('Failed to mark email as read:', error)
    res.status(500).json({ error: 'Failed to mark email as read' })
  }
})

// Get unread email count
router.get('/email/unread-count', async (req, res) => {
  try {
    const { email } = req.query
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const count = await Email.countDocuments({
      recipientEmail: email.toLowerCase(),
      isRead: false
    })

    res.json({ count })
  } catch (error) {
    console.error('Failed to fetch unread count:', error)
    res.status(500).json({ error: 'Failed to fetch unread count' })
  }
})

// Debug endpoint to list all emails
router.get('/email/debug/all', async (req, res) => {
  try {
    const allEmails = await Email.find({}).sort({ createdAt: -1 })
    console.log('All emails in database:', allEmails.length)
    res.json({ count: allEmails.length, emails: allEmails })
  } catch (error) {
    console.error('Failed to fetch all emails:', error)
    res.status(500).json({ error: 'Failed to fetch all emails' })
  }
})

export default router
