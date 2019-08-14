import mongoose from 'mongoose'
import { MONGO_DATABASE_URL } from '../utils/constants'

let client: any = null

async function connectToDb() {
  if (!client) {
    try {
      client = await mongoose.connect(MONGO_DATABASE_URL, {
        useNewUrlParser: true
      })
      // tslint:disable-next-line:no-console
      console.log(`Connected to mongo at ${MONGO_DATABASE_URL}`)
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('error', e)
    }
  }
}

connectToDb()

export default mongoose
