import * as React from 'react'
import LoginForm from '../components/forms/LoginForm'
import ResetPasswordForm from '../components/forms/ResetPasswordForm'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from '../components/GlobalStyle'
import { useLoginServiceContext } from '../context/UserContext'
import { useSettingsContext } from '../context/SettingsContext'

const PageWrapper = styled.div`
  padding: 0 4%;
  background-color: #f5f6fa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
      <ThemeProvider theme={settingsContext.state.theme}>
        <GlobalStyle />
      </ThemeProvider>

      <ThemeProvider theme={settingsContext.state.theme}>
        <PageWrapper>{renderView()}</PageWrapper>
      </ThemeProvider>
    </>
  )
}

export default LoginView
