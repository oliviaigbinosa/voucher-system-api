import dotenv from 'dotenv'
dotenv.config()

import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import Admin from './models/Admin.js'
import SuperAdmin from './models/SuperAdmin.js'
import User from './models/User.js'

const MONGODB_URI = process.env.MONGODB_URI

const testUsers = [
  {
    email: 'department.manager@getpayedmail.com',
    password: 'Password!123',
    role: 'admin',
    department: 'Operations',
    model: 'Admin'
  },
  {
    email: 'department.member@getpayedmail.com',
    password: 'Password!123',
    role: 'user',
    department: 'Operations',
    model: 'User'
  }
]

async function seedTestUsers() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    for (const userData of testUsers) {
      const { email, password, role, department, model } = userData
      const hashedPassword = await bcrypt.hash(password, 10)

      let Model
      if (model === 'SuperAdmin') {
        Model = SuperAdmin
      } else if (model === 'Admin') {
        Model = Admin
      } else {
        Model = User
      }

      // Check if user already exists
      const existingUser = await Model.findOne({ email })
      if (existingUser) {
        console.log(`User ${email} already exists, updating password...`)
        existingUser.password = hashedPassword
        existingUser.role = role
        existingUser.department = department
        await existingUser.save()
        console.log(`Updated ${email} successfully`)
      } else {
        const newUser = new Model({
          email,
          password: hashedPassword,
          role,
          department
        })
        await newUser.save()
        console.log(`Created ${email} successfully`)
      }
    }

    console.log('Test users seeded successfully!')
  } catch (error) {
    console.error('Error seeding test users:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

seedTestUsers()
