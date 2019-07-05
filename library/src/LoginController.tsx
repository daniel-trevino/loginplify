import * as React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Login from './pages/Login'
import { UserContext } from './context/UserContext'

const ENDPOINT_URL = process.env.ENDPOINT_URL || null

const client = new ApolloClient({ uri: ENDPOINT_URL })

const LoginController = (props: any) => {
  const { state } = React.useContext(UserContext)

  if (!ENDPOINT_URL) {
    console.error('Please assign ENDPOINT_URL on your environmental variables')
    return null
  }

  // Only re-rendered if `state.loggedIn` changes:
  const children = React.useMemo(
    () => <React.Fragment>{props.children}</React.Fragment>,
    [state.loggedIn]
  )

  const loginPage = React.useMemo(() => <Login />, [state.loggedIn])

  if (state.loggedIn) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }

  return <ApolloProvider client={client}>{loginPage}</ApolloProvider>
}

export default LoginController
