// @ts-ignore
global.fetch = require('node-fetch')
import withAuthenticator from './components/withAuthenticator'
import { useLoginServiceContext } from './context/UserContext'

export { withAuthenticator, useLoginServiceContext }

export default withAuthenticator
