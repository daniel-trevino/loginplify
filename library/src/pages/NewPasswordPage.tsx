import * as React from 'react'
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
  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <PageWrapper>
          <NewPasswordForm token={token} endpoint={endpoint} />
        </PageWrapper>
      </ThemeProvider>
    </>
  )
}

export default NewPasswordPage
