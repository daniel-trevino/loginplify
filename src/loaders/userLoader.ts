export const batchUsers = async (keys: Array<string>, models: any) => {
  const users = await models.User.find({
    _id: {
      $in: keys
    }
  })

  return keys.map((key: string) => users.find((user: any) => user.id == key))
}
