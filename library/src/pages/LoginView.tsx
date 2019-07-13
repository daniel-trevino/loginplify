import * as React from 'react'
import LoginForm from '../components/forms/LoginForm'
import ResetPasswordForm from '../components/forms/ResetPasswordForm'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../components/GlobalStyle'
import { useLoginServiceContext } from '../context/UserContext'
import { useSettingsContext } from '../context/SettingsContext'
import PageWrapper from '../components/PageWrapper'

const LoginView = () => {
  const { state } = useLoginServiceContext()
  const settingsContext = useSettingsContext()

  const renderView = () => {
    switch (state.view) {
      case 'login':
      case 'signup':
        return <LoginForm />
      case 'requestReset':
        return <ResetPasswordForm />
      default:
        return null
    }
  }

  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={settingsContext.state.theme}>
        <PageWrapper>{renderView()}</PageWrapper>
      </ThemeProvider>
    </>
  )
}

export default LoginView
