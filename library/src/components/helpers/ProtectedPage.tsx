import * as React from 'react'
import { UserContext } from '../../context/UserContext'

const ProtectedPage = () => {
  const { actions } = React.useContext(UserContext)
  return (
    <div>
      <h1>You are logged In</h1>
      <button onClick={() => actions.logout()}>Logout</button>
    </div>
  )
}

export default ProtectedPage
