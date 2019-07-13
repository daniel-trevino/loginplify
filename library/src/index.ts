// @ts-ignore
global.fetch = require('node-fetch')
import withAuthenticator from './components/withAuthenticator'
import { useLoginServiceContext } from './context/UserContext'
import NewPasswordPage from './pages/NewPasswordPage'
import VerifyPage from './pages/VerifyPage'

export {
  withAuthenticator,
  useLoginServiceContext,
  NewPasswordPage,
  VerifyPage
}

export default withAuthenticator
