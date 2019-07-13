import * as React from 'react'
import { withRouter } from 'next/router'
import get from 'lodash/get'
import { NewPasswordPage } from 'loginplify'

type Props = {
  router: any
}

const Verify = (props: Props) => {
  const resetToken = get(props.router, 'query.token')

  return (
    <NewPasswordPage
      token={resetToken}
      endpoint="https://loginservice.danieltrevino.se/graphql"
    />
  )
}

export default withRouter(Verify)
