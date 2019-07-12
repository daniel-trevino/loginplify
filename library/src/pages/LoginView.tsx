import * as React from 'react'
import LoginForm from '../components/forms/LoginForm'
import ResetPasswordForm from '../components/forms/ResetPasswordForm'
import styled from 'styled-components'
import GlobalStyle from '../components/GlobalStyle'
import { useLoginServiceContext } from '../context/UserContext'

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
      <PageWrapper>{renderView()}</PageWrapper>
    </>
  )
}

export default LoginView
