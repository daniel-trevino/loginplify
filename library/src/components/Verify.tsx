import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Message from './Message'

type Props = {
  token: string
  trigggerVerify?: boolean
}

export const VERIFY_USER = gql`
  mutation VERIFY_USER($token: String!) {
    verify(token: $token)
  }
`

const TriggerVerify = (props: any) => {
  React.useEffect(() => {
    props.verifyUser()
  }, [])

  return props.children
}

const Verify = (props: Props) => {
  const { token, trigggerVerify = true } = props

  if (!token) {
    return (
      <Message title="Invalid token">
        The token you have provided is invalid
      </Message>
    )
  }

  const Success = (
    <Message title="Account verified correcty" success>
      You may close this window now
    </Message>
  )

  return (
    <Mutation mutation={VERIFY_USER} variables={{ token }}>
      {(verifyUser: any, { error }: any) => {
        if (error) return <Message title="Error">{error.message}</Message>

        // This is to show how it would look with verification
        if (!trigggerVerify) {
          return Success
        }

        return <TriggerVerify verifyUser={verifyUser}>{Success}</TriggerVerify>
      }}
    </Mutation>
  )
}

export default Verify
