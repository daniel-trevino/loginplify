import * as React from 'react'
import { UserContext } from '../context/UserContext'

const LoginForm = () => {
  const { actions } = React.useContext(UserContext)
  return (
    <div>
      <h1>Login Form</h1>
      <button onClick={() => actions.login()}>Login</button>
    </div>
  )
}

export default LoginForm
