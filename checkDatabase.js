import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

async function checkDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    console.log('Current database:', mongoose.connection.name)
    console.log('Collections:', Object.keys(mongoose.connection.collections))
    
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    console.log('Available collections in database:')
    collections.forEach(col => console.log(` - ${col.name}`))
    
    // Check each collection for documents
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments()
      console.log(`Documents in ${col.name}: ${count}`)
    }
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
  }
}

checkDatabase()
