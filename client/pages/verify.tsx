import * as React from 'react'
import get from 'lodash/get'
import { withRouter } from 'next/router'
import { VerifyPage } from 'loginplify'
import { getEndpoint } from '../utils/env'

type Props = {
  router: any
  hostname: string
}

const Verify = (props: Props) => {
  const verifyToken = get(props.router, 'query.token')
  const endpoint = getEndpoint(props.hostname)

  return <VerifyPage token={verifyToken} endpoint={endpoint} />
}

export default withRouter(Verify)
