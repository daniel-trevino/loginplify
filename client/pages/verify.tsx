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

const Verify = ({ router }: Props) => {
  const token = get(router, 'query.token')

  if (!token) {
    return <div>Invalid token</div>
  }

  return (
    <Mutation mutation={VERIFY_USER} variables={{ token }}>
      {(verifyUser: any, { error }: any) => {
        if (error) return <p>{error.message}</p>

        return (
          <TriggerVerify verifyUser={verifyUser}>
            Your account has been verified. You may close this page now.
          </TriggerVerify>
        )
      }}
    </Mutation>
  )
}

export default withRouter(Verify)
