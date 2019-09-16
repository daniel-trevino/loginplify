import * as React from 'react'
import Message from './Message'
import Balls from './Balls'
import MainApi from '../utils/api/MainApi'
import mutations from '../utils/mutations'

type Props = {
  token: string
  endpoint: string
}

const Verify = (props: Props) => {
  const { endpoint } = props
  const [requestSent, setRequestSent] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState(null)
  const { token } = props

  const init = async () => {
    const variables = {
      token
    }

    const body = {
      query: mutations.verifyUserMutation,
      variables
    }

    const { data } = await MainApi.post(endpoint, body)
    setLoading(false)
    if (data.errors) {
      setError(data.errors[0])
      return
    }
    setRequestSent(true)
  }

  React.useEffect(() => {
    init()
  }, [])

  if (!token) {
    return (
      <Message title="Invalid token">
        The token you have provided is invalid
      </Message>
    )
  }

  if (error) return <Message title="Error">{error.message}</Message>

  // This is to show how it would look with verification
  if (requestSent && !loading) {
    return (
      <Message title="Account verified correcty" success>
        You may close this window now
      </Message>
    )
  }

  return <Balls />
}

export default Verify
