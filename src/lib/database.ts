import * as mongoose from 'mongoose'
import { MONGO_DATABASE_URL } from '../utils/constants'

// Save mongose promise
// tslint:disable-next-line:no-var-requires
require('mongoose').Promise = global.Promise

mongoose.connect(MONGO_DATABASE_URL, { useNewUrlParser: true })

mongoose.connection.once('open', () =>
  // tslint:disable-next-line:no-console
  console.log(`Connected to mongo at ${MONGO_DATABASE_URL}`)
)

export default mongoose
