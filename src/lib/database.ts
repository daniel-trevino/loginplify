import mongoose from 'mongoose'
import { DATABASE_URL } from '../utils/constants'

// Connect to MongoDB with Mongoose.
const mongooseConnection = mongoose
  .connect(DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

export default mongooseConnection
