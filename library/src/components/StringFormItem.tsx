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
}

const FormItem = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-weight: 800;
`

const StringFormItem = (props: IProps) => {
  const { label, name, getFieldDecorator, placeholder, type, className } = props

  return (
    <FormItem className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      {getFieldDecorator(name)(
        <Input name={name} placeholder={placeholder} type={type} />
      )}
    </FormItem>
  )
}

export default StringFormItem
