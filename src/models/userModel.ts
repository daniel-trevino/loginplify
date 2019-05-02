import mongoose from '../lib/database'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  userName: String
})

const User = mongoose.model('user', userSchema)

export default User
