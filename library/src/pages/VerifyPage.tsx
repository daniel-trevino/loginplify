import * as React from 'react'

import PageWrapper from '../components/PageWrapper'
import Verify from '../components/Verify'
import { ThemeProvider } from 'styled-components'
import theme from '../utils/theme'
import ContainerStyle from '../components/styles/ContainerStyle'

interface IProps {
  token: string
  endpoint: string
}

const VerifyPage = (props: IProps) => {
  const { endpoint, token } = props

  return (
    <ContainerStyle>
      <ThemeProvider theme={theme}>
        <PageWrapper>
          <Verify token={token} endpoint={endpoint} />
        </PageWrapper>
      </ThemeProvider>
    </ContainerStyle>
  )
}

export default VerifyPage
