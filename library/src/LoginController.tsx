import * as React from 'react'
import Cookies from 'js-cookie'

import LoginView from './pages/LoginView'
import { UserContext } from './context/UserContext'
import { SettingsContext } from './context/SettingsContext'

const LoginController = (props: any) => {
  const { state, actions } = React.useContext(UserContext)
  const settingsContext = React.useContext(SettingsContext)
  // This solves issues with SSR
  const readingTokenFromCookie = state.isAuthenticating && !state.loggedIn
  const userIsLoggedOut = !state.loggedIn && !state.isAuthenticating

  if (!settingsContext.state.endpoint) {
    console.error('Please initialize the login package')
    return null
  }

  if (readingTokenFromCookie) {
    const currentToken = Cookies.get('loginplify-token')

    if (currentToken) {
      actions.login(currentToken)
    } else {
      // User is logged out, no token
      actions.setIsAuthenticating(false)
    }

    // Return white screen, instead of a loading state
    return null
  }

  if (state.loggedIn) {
    return props.children
  } else if (userIsLoggedOut) {
    return <LoginView />
  }

  return null
}

export default LoginController
