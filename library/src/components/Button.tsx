import * as React from 'react'
import styled from 'styled-components'
import Balls from './Balls'
import { color } from '../utils/vars'

interface IProps {
  className?: string
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  type: 'button' | 'reset' | 'submit'
}

const ButtonComponent = styled.button`
  &:before {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    opacity: 0.2;
    transform: scaleY(0);
    transform-origin: 50% 100%;
    transition-timing-function: ease-out;
    transition-duration: 0.3s;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    box-sizing: border-box;
    content: '';
  }

  &:hover {
    &:before {
      transform: scaleY(1);
    }
  }

  border-radius: 4px;
  border: none;
  width: 100%;
  padding: 0.8rem 0;
  position: relative;
  margin: 1rem 0;
  background: ${(props: any) => props.theme.primaryColor || color};
  text-align: center;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  letter-spacing: 0.5px;
  transform: perspective(1px) translateZ(0);
  transform: scale(1);
  transition-duration: 0.3s;
  transition-property: color;
  display: block;
  cursor: pointer;

  ${(p: any) =>
    p.disabled &&
    `
    pointer-events: none;
    background-color: ${p.theme.lightGray};
    color: ${p.theme.darkGray};
  `}
`

const BallsWrapper = styled.div`
  width: 100%;
  padding: 0.8rem 0;
  display: flex;
  justify-content: center;
`

const Button = (props: IProps) => {
  const { loading = false, type, children, className, disabled = false } = props

  if (loading) {
    return (
      <BallsWrapper>
        <Balls />
      </BallsWrapper>
    )
  }

  return (
    <ButtonComponent type={type} className={className} disabled={disabled}>
      {children}
    </ButtonComponent>
  )
}

export default Button
