enum PERMISSIONS {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type IPermissionsObject = { [K in keyof typeof PERMISSIONS]: K }

export type Permission = keyof typeof PERMISSIONS

export interface IPermission {
  _id: string
  enum: Permission
}
