import mongoose from '../lib/database'

const Schema = mongoose.Schema

const userSchema = new Schema({
  createdAt: String,
  email: String,
  name: String,
  password: String,
  resetToken: String,
  resetTokenExpiry: Number
})

const User = mongoose.model('user', userSchema)

export default User
