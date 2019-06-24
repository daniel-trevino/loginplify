import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { getHostname, cleanHostname } from '../utils/env'

function createClient({ headers }: any) {
  const host = getHostname(headers)

  const ENDPOINT =
    process.env.NODE_ENV === 'development'
      ? `http://${cleanHostname(host)}:3000/graphql`
      : `https://${host}/graphql`

  return new ApolloClient({
    uri: ENDPOINT,
    request: operation => {
      operation.setContext({
        headers
      })
    }
  })
}

export default withApollo(createClient)
