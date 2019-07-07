import * as React from 'react'
import LoginForm from '../components/LoginForm'
import styled from 'styled-components'
import GlobalStyle from '../components/GlobalStyle'

const PageWrapper = styled.div`
  background-color: #f5f6fa;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Login = () => {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <LoginForm />
      </PageWrapper>
    </>
  )
}

export default Login
