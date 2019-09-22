import * as React from 'react'
import PageWrapper from '../components/PageWrapper'
import NewPasswordForm from '../components/forms/NewPasswordForm'
import { ThemeProvider } from 'styled-components'
import theme from '../utils/theme'
import ContainerStyle from '../components/styles/ContainerStyle'

interface IProps {
  token: string
  endpoint: string
}

const NewPasswordPage = (props: IProps) => {
  const { token, endpoint } = props
  return (
    <ContainerStyle>
      <ThemeProvider theme={theme}>
        <PageWrapper>
          <NewPasswordForm token={token} endpoint={endpoint} />
        </PageWrapper>
      </ThemeProvider>
    </ContainerStyle>
  )
}

export default NewPasswordPage
