import * as React from 'react'
import { withRouter } from 'next/router'
import get from 'lodash/get'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

type Props = {
  router: {
    token: string
  }
}

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
    }
  }
`

const Verify = ({ router }: Props) => {
  const resetToken = get(router, 'query.token')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [showSuccess, setShowSuccess] = React.useState(false)

  if (!resetToken) {
    return <div>Invalid token</div>
  }

  const onSubmit = (e: any, resetPassword: any) => {
    e.preventDefault()
    const variables = { resetToken, password, confirmPassword }
    console.log(variables)
    resetPassword({
      variables
    })
    setShowSuccess(true)
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <Mutation mutation={RESET_PASSWORD}>
      {(resetPassword: any, { error }: any) => {
        return (
          <form onSubmit={(e: any) => onSubmit(e, resetPassword)}>
            <input
              placeholder="new password"
              value={password}
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <input
              placeholder="confirm new password"
              value={confirmPassword}
              type="password"
              onChange={(e: any) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Confirm</button>
            {showSuccess && !error && <p>Password has been changed</p>}
            {error && <p>{error.message}</p>}
          </form>
        )
      }}
    </Mutation>
  )
}

export default withRouter(Verify)
