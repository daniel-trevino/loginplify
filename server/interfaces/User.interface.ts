import { IPermission, Permission } from './Permission.interface'

export interface IUser {
  _id: string
  permissions: Array<IPermission>
  verified: boolean
  email: string
  password: string
  name: string
  createdAt: string
  verifyToken: string
  verifyTokenExpiry: number
}

export interface IUserTokenData {
  id: string
  permissions: Array<Permission>
}
