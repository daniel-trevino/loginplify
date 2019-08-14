import mongoose from 'mongoose'
import { MONGO_DATABASE_URL } from '../utils/constants'

let client: any = null

async function connectToDb() {
  if (!client) {
    try {
      client = await mongoose.connect(MONGO_DATABASE_URL, {
        useNewUrlParser: true
      })
      console.log(`Connected to mongo at ${MONGO_DATABASE_URL}`)
    } catch (e) {
      console.log('erorr', e)
    }
  }
}

connectToDb()

export default mongoose
