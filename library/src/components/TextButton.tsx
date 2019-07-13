import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  className?: string
  children: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  style?: any
}

const TextButtonComponent = styled.div`
  color: ${(props: any) => props.theme.primaryColor};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const TextButton = (props: IProps) => {
  const { children, className, onClick, style } = props

  return (
    <TextButtonComponent className={className} onClick={onClick} style={style}>
      {children}
    </TextButtonComponent>
  )
}

export default TextButton
