import * as React from 'react'
import { withAuthenticator, useLoginServiceContext } from 'loginplify'

const settings = {
  endpoint: 'https://loginservice.danieltrevino.se/graphql'
}

const Secret = () => {
  const { actions } = useLoginServiceContext()

  return (
    <div>
      <h1>Hello Secret</h1>
      <button onClick={() => actions.logout()}>Logout</button>
    </div>
  )
}

export default withAuthenticator(Secret, settings)
