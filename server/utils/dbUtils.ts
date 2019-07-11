import { PERMISSIONS } from './constants'

export async function getDefaultPermissions(ctx: any) {
  try {
    const permissionExists = await ctx.models.Permission.findOne({
      enum: PERMISSIONS.USER
    })

    if (!permissionExists) {
      await createAdminPermission(ctx)
      // Create default permission
      const newDefaultPermission = await ctx.models.Permission.create({
        enum: PERMISSIONS.USER
      })

      return newDefaultPermission
    }

    return permissionExists
  } catch (e) {
    throw new Error(e)
  }
}

export async function createAdminPermission(ctx: any) {
  try {
    const adminPermissionExists = await ctx.models.Permission.findOne({
      enum: PERMISSIONS.ADMIN
    })

    if (!adminPermissionExists) {
      // Create default permission
      await ctx.models.Permission.create({
        enum: PERMISSIONS.ADMIN
      })
    }
  } catch (e) {
    throw new Error(e)
  }
}
