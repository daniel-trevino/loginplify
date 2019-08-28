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
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': Array<Permission>
    'x-hasura-default-role': string
    'x-hasura-user-id': string
    'x-hasura-org-id'?: string
    'x-hasura-custom'?: string
  }
}
