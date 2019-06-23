import mongoose from '../lib/database'

const Schema = mongoose.Schema

const userSchema = new Schema({
  createdAt: String,
  email: String,
  name: String,
  password: String,
  permissions: [
    {
      ref: 'permission',
      type: Schema.Types.ObjectId
    }
  ],
  resetToken: String,
  resetTokenExpiry: Number,
  verified: {
    default: false,
    required: true,
    type: Boolean
  },
  verifyToken: String,
  verifyTokenExpiry: Number
})

const User = mongoose.model('user', userSchema)

export default User
