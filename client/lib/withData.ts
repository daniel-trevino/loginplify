import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { cleanHostname } from '../utils/env'

function createClient({ headers }: any) {
  const host = (headers && headers.host) || 'localhost'

  const ENDPOINT =
    process.env.NODE_ENV === 'development'
      ? `http://${cleanHostname(host)}:3000/graphql`
      : `https://loginservice.${host}/graphql`

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
