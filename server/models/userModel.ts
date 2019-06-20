import mongoose from '../lib/database'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  createdAt: String,
  resetToken: String,
  resetTokenExpiry: Number,
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'permission'
    }
  ]
})

const User = mongoose.model('user', userSchema)

export default User
