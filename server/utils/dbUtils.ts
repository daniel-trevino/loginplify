import { PERMISSIONS, DEFAULT_PERMISSION } from './constants'

export async function getDefaultPermissions(ctx: any) {
  try {
    const permissionExists = await ctx.models.Permission.findOne({
      enum: DEFAULT_PERMISSION
    })

    if (!permissionExists) {
      await createAdminPermission(ctx)
      // Create default permission
      const newDefaultPermission = await ctx.models.Permission.create({
        enum: DEFAULT_PERMISSION
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
      enum: PERMISSIONS.admin
    })

    if (!adminPermissionExists) {
      // Create default permission
      await ctx.models.Permission.create({
        enum: PERMISSIONS.admin
      })
    }
  } catch (e) {
    throw new Error(e)
  }
}
