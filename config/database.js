import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'
import SuperAdmin from '../models/SuperAdmin.js'

export async function connectDb() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set in .env')
    process.exit(1)
  }
  
  // Log the URI with credentials masked for debugging
  const maskedUri = uri.replace(/:([^:@]+)@/, ':***@')
  console.log('Attempting to connect to MongoDB:', maskedUri)
  
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB Atlas')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    console.error('Full error details:', error)
    throw error
  }
}


