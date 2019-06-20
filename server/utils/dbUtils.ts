import { DEFAULT_PERMISSION } from './constants'

export async function getDefaultPermissions(ctx: any) {
  try {
    const permissionExists = await ctx.models.Permission.findOne({
      enum: DEFAULT_PERMISSION
    })

    if (!permissionExists) {
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
