import * as React from 'react'
import Input from './Input'
import styled from 'styled-components'

interface IProps {
  name: string
  label?: string
  className?: string
  getFieldDecorator: any
  placeholder?: string
  type: 'text' | 'password' | 'number'
  setFields: any
  onChange?: Function
  ref?: any
  noMargin?: boolean
}

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const Label = styled.label`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  padding-bottom: 0.5rem;
`

const StringFormItem = (props: IProps) => {
  const {
    label,
    name,
    getFieldDecorator,
    placeholder,
    type,
    className,
    onChange,
    ref,
    noMargin
  } = props

  return (
    <FormItem className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      {getFieldDecorator(name)(
        <Input
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          ref={ref}
          noMargin={noMargin}
        />
      )}
    </FormItem>
  )
}

export default StringFormItem
