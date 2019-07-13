import * as React from 'react'
import styled from 'styled-components'
import Confetti from 'react-dom-confetti'

interface IProps {
  title: string
  children: React.ReactNode
}

const Wrapper = styled.div`
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 3em;
  text-align: center;
`

const Title = styled.h1`
  color: ${(props: any) => props.theme.primaryColor};
  font-weight: 800;
  display: block;
  margin-bottom: 0.5rem;
`

const config = {
  angle: 75,
  spread: 55,
  startVelocity: 45,
  elementCount: 50,
  dragFriction: 0.1,
  duration: 4000,
  stagger: 0,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
}

const SuccessMessage = (props: IProps) => {
  const { title, children } = props
  const [animationTimeout, setAnimationTimeout] = React.useState()
  const [confetti, setConfetti] = React.useState(false)

  React.useEffect(() => {
    setAnimationTimeout(
      setTimeout(() => {
        if (!confetti) {
          setConfetti(true)
        }
      }, 500)
    )

    return () => {
      clearTimeout(animationTimeout)
    }
  }, [])

  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}

      <Confetti active={confetti} config={config} />
    </Wrapper>
  )
}

export default SuccessMessage
