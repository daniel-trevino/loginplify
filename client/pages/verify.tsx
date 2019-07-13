import * as React from 'react'
import get from 'lodash/get'
import { withRouter } from 'next/router'
import { VerifyPage } from 'loginplify'

type Props = {
  router: any
}

const Verify = (props: Props) => {
  const verifyToken = get(props.router, 'query.token')

  return (
    <VerifyPage
      token={verifyToken}
      endpoint="https://loginservice.danieltrevino.se/graphql"
    />
  )
}

export default withRouter(Verify)
