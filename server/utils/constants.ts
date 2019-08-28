import {
  IPermissionsObject,
  Permission
} from '../interfaces/Permission.interface'

export const PORT: number = parseInt(process.env.PORT || '', 10) || 3000
export const APP_SECRET: string = process.env.APP_SECRET || ''
export const MONGO_DATABASE_URL: string = process.env.MONGO_DATABASE_URL || ''
export const EMAIL_HOST: string = process.env.EMAIL_HOST || ''
export const EMAIL_USER: string = process.env.EMAIL_USER || ''
export const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD || ''
export const EMAIL_SENDER: string = process.env.EMAIL_SENDER || ''
export const PERMISSIONS: IPermissionsObject = {
  admin: 'admin',
  user: 'user'
}
export const DEFAULT_PERMISSION: Permission = PERMISSIONS.user
