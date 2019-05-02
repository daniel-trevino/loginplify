import * as mongoose from 'mongoose'

// Save mongose promise
// tslint:disable-next-line:no-var-requires
require('mongoose').Promise = global.Promise

const MONGO_DATABASE_URL = process.env.MONGO_DATABASE_URL || ''

mongoose.connect(MONGO_DATABASE_URL, { useNewUrlParser: true })

mongoose.connection.once('open', () =>
  // tslint:disable-next-line:no-console
  console.log(`Connected to mongo at ${MONGO_DATABASE_URL}`)
)

export default mongoose
