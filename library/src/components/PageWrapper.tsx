import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  children: React.ReactNode
}

const PageWrapperComponent = styled.div`
  padding: 0 4%;
  background-color: #f5f6fa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageWrapper = (props: IProps) => {
  const { children } = props

  return <PageWrapperComponent>{children}</PageWrapperComponent>
}

export default PageWrapper
