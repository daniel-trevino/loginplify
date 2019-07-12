import * as React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import LoginView from './pages/LoginView'
import { UserContext } from './context/UserContext'
import { SettingsContext } from './context/SettingsContext'

const LoginController = (props: any) => {
  const { state } = React.useContext(UserContext)
  const settingsContext = React.useContext(SettingsContext)

  if (!settingsContext.state.endpoint) {
    console.error('Please initialize the login package')
    return null
  }

  const client = new ApolloClient({ uri: settingsContext.state.endpoint })

  // Only re-rendered if `state.loggedIn` changes:
  const children = React.useMemo(
    () => <React.Fragment>{props.children}</React.Fragment>,
    [state.loggedIn]
  )

  const loginPage = React.useMemo(() => <LoginView />, [state.loggedIn])

  if (state.loggedIn) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }

  return <ApolloProvider client={client}>{loginPage}</ApolloProvider>
}

export default LoginController
