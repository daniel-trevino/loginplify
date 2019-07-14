import * as React from 'react'
import { withRouter } from 'next/router'
import get from 'lodash/get'
import { NewPasswordPage } from 'loginplify'
import { getEndpoint } from '../utils/env'

type Props = {
  router: any
  hostname: string
}

const ResetPassword = (props: Props) => {
  const resetToken = get(props.router, 'query.token')
  const endpoint = getEndpoint(props.hostname)

  return <NewPasswordPage token={resetToken} endpoint={endpoint} />
}

export default withRouter(ResetPassword)
