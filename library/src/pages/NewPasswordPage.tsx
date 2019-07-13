import * as React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import PageWrapper from '../components/PageWrapper'
import NewPasswordForm from '../components/forms/NewPasswordForm'
import GlobalStyle from '../components/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from '../utils/theme'

interface IProps {
  token: string
  endpoint: string
}

const NewPasswordPage = (props: IProps) => {
  const { token, endpoint } = props
  const client = new ApolloClient({ uri: endpoint })
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <PageWrapper>
          <NewPasswordForm token={token} />
        </PageWrapper>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default NewPasswordPage
