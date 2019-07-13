import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { color } from '../utils/vars'

const leftSwingAnimation = keyframes`
  50%,
  100% {
    transform: translateX(95%);
  }
`

const rightSwingAnimation = keyframes`
  50% {
    transform: translateX(-95%);
  }
  100% {
    transform: translateX(100%);
  }
`

const BallsWrapper = styled.div`
  width: 4em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`

const Ball = styled.div`
  width: ${(props: any) =>
    props.theme.fontSize ? props.theme.fontSize.xs : '0.8rem'};
  height: ${(props: any) =>
    props.theme.fontSize ? props.theme.fontSize.xs : '0.8rem'};
  border-radius: 50%;
  background-color: ${(props: any) => props.theme.primaryColor || color};

  &:nth-of-type(1) {
    transform: translateX(-100%);
    animation: ${leftSwingAnimation} 0.5s ease-in alternate infinite;
  }

  &:nth-of-type(3) {
    transform: translateX(-95%);
    animation: ${rightSwingAnimation} 0.5s ease-out alternate infinite;
  }
`

const Balls = () => {
  return (
    <BallsWrapper>
      <Ball />
      <Ball />
      <Ball />
    </BallsWrapper>
  )
}

export default Balls
