import * as React from 'react'

import PageWrapper from '../components/PageWrapper'
import Verify from '../components/Verify'
import GlobalStyle from '../components/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from '../utils/theme'

interface IProps {
  token: string
  endpoint: string
}

const VerifyPage = (props: IProps) => {
  const { endpoint, token } = props

  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <PageWrapper>
          <Verify token={token} endpoint={endpoint} />
        </PageWrapper>
      </ThemeProvider>
    </>
  )
}

export default VerifyPage
