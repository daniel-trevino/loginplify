import mongoose from '../lib/database'

const Schema = mongoose.Schema

const permissionSchema = new Schema({
  enum: String
})

const Permission = mongoose.model('permission', permissionSchema)

export default Permission
