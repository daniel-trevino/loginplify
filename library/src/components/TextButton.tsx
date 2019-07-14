import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  className?: string
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  style?: any
  href?: string
  target?: string
}

const TextButtonComponent = styled.div`
  color: ${(props: any) => props.theme.primaryColor};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const TextButton = (props: IProps) => {
  const { children, className, onClick, style, href, target = '_self' } = props

  return (
    <TextButtonComponent className={className} onClick={onClick} style={style}>
      {href ? (
        <a href={href} target={target} rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        children
      )}
    </TextButtonComponent>
  )
}

export default TextButton
