enum PERMISSIONS {
  admin = 'admin',
  user = 'user'
}

export type IPermissionsObject = { [K in keyof typeof PERMISSIONS]: K }

export type Permission = keyof typeof PERMISSIONS

export interface IPermission {
  _id: string
  enum: Permission
}
