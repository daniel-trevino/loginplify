import dotenv from 'dotenv'
import * as React from 'react'
import { UserProvider } from '../context/UserContext'
import LoginController from '../LoginController'

dotenv.config()

function withAuthenticator(Wrapped: any) {
  return (
    <UserProvider>
      <LoginController>
        <Wrapped />
      </LoginController>
    </UserProvider>
  )
}

export default withAuthenticator
