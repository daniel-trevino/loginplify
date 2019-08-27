import * as React from 'react'
import { useLoginServiceContext } from '../../context/UserContext'
import withAuthenticator from '../../components/withAuthenticator'

const settings = {
  endpoint: 'https://loginplify.danieltrevino.se/graphql',
  theme: {
    primaryColor: '#2f54eb'
  }
}

const ProtectedPage = () => {
  const { actions } = useLoginServiceContext()

  const onClick = () => {
    actions.logout()
  }

  return (
    <div>
      <h1>You are logged in</h1>

      <button onClick={onClick}>Logout</button>
    </div>
  )
}

export default withAuthenticator(ProtectedPage, settings)
