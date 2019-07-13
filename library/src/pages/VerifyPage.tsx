import * as React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import PageWrapper from '../components/PageWrapper'
import Verify from '../components/Verify'
import GlobalStyle from '../components/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from '../utils/theme'

interface IProps {
  trigggerVerify?: boolean
  token: string
  endpoint: string
}

const VerifyPage = (props: IProps) => {
  const { trigggerVerify, endpoint, token } = props

  const client = new ApolloClient({ uri: endpoint })

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <PageWrapper>
          <Verify token={token} trigggerVerify={trigggerVerify} />
        </PageWrapper>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default VerifyPage
