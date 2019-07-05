import * as React from 'react'

import LoginForm from './components/LoginForm'
import { UserContext } from './context/UserContext'

const LoginController = (props: any) => {
  const { state } = React.useContext(UserContext)

  // Only re-rendered if `state.loggedIn` changes:
  const children = React.useMemo(
    () => <React.Fragment>{props.children}</React.Fragment>,
    [state.loggedIn]
  )

  const loginForm = React.useMemo(() => <LoginForm />, [state.loggedIn])

  if (state.loggedIn) {
    return children
  }

  return loginForm
}

export default LoginController
