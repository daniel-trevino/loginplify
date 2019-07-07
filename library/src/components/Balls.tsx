import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { primaryColor } from '../utils/vars'

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
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: ${primaryColor};

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
