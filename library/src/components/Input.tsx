import * as React from 'react'
import styled from 'styled-components'
import { primaryColor, bordercolor } from '../utils/vars'

interface IProps {
  name: string
  placeholder?: string
  type: 'text' | 'password' | 'number'
  onChange?: Function
}

const InputComponent = styled.input`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 20px;
  border: 1px solid ${bordercolor};
  border-radius: 3px;
  outline-color: ${primaryColor};
  color: #000;
  transition: border-color 0.5s ease-out;
  -webkit-box-shadow: none;
  box-shadow: none;
`

const Input = (props: IProps) => {
  const { name, placeholder, type, onChange } = props
  const inputEl: any = React.useRef(null)

  const [value, setValue] = React.useState()

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  const onChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)

    if (onChange) {
      let event = e
      if (e.type === 'click') {
        // click clear icon
        event = Object.create(e)
        event.target = inputEl
        event.currentTarget = inputEl
        const originalInputValue = inputEl.value
        // change input value cause e.target.value should be '' when clear input
        inputEl.value = ''
        onChange(event as React.ChangeEvent<HTMLInputElement>)
        // reset input value
        inputEl.value = originalInputValue
        return
      }
      onChange(event as React.ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <InputComponent
      placeholder={placeholder}
      value={fixControlledValue(value)}
      type={type}
      onChange={onChangeLocal}
      name={name}
    />
  )
}

export default Input
