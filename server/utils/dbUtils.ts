import { PERMISSIONS } from './constants'

export async function getDefaultPermissions(ctx: any) {
  try {
    const permissionExists = await ctx.models.Permission.findOne({
      enum: PERMISSIONS.DEFAULT_PERMISSION
    })

    if (!permissionExists) {
      await createAdminPermission(ctx)
      // Create default permission
      const newDefaultPermission = await ctx.models.Permission.create({
        enum: PERMISSIONS.DEFAULT_PERMISSION
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
      enum: PERMISSIONS.ADMIN_PERMISSION
    })

    if (!adminPermissionExists) {
      // Create default permission
      await ctx.models.Permission.create({
        enum: PERMISSIONS.ADMIN_PERMISSION
      })
    }
  } catch (e) {
    throw new Error(e)
  }
}
