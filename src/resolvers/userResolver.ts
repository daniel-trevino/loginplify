import User from '../models/userModel'

// Provide resolver functions for your schema fields
const userResolver = {
  Mutation: {
    addUser: async (_: any, args: any) => {
      try {
        const response = await User.create(args)
        return response
      } catch (e) {
        return e.message
      }
    }
  },
  Query: {
    getUsers: async () => await User.find({}).exec()
  }
}

export default userResolver
