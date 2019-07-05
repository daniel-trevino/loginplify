import * as React from 'react'
import LoginForm from '../components/LoginForm'
import styled from 'styled-components'

interface IWrapperProps {
  backgroundUrl?: string
}

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  ${(p: IWrapperProps) =>
    p.backgroundUrl && `background: url(${p.backgroundUrl});`}
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Login = () => {
  const randomImage = 'https://source.unsplash.com/random/1200x1200'

  return (
    <PageWrapper backgroundUrl={randomImage}>
      <LoginForm />
    </PageWrapper>
  )
}

export default Login
