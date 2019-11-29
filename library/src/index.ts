// @ts-ignore
global.fetch = require('node-fetch')
import withAuthenticator from './components/withAuthenticator'
import Balls from './components/Balls'
import Button from './components/Button'
import Input from './components/Input'
import StringFormItem from './components/StringFormItem'
import TextButton from './components/TextButton'
import Message from './components/Message'
import { useLoginServiceContext } from './context/UserContext'
import NewPasswordPage from './pages/NewPasswordPage'
import VerifyPage from './pages/VerifyPage'

export {
  withAuthenticator,
  useLoginServiceContext,
  NewPasswordPage,
  VerifyPage,
  Balls,
  Button,
  Input,
  Message,
  StringFormItem,
  TextButton
}

export default withAuthenticator
