import * as React from 'react'
import useForm from 'rc-form-hooks'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import StringFormItem from '../components/StringFormItem'
import { useLoginServiceContext } from '../context/UserContext'
import styled from 'styled-components'

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const Form = styled.form`
  position: absolute;
  background-color: #ffffff;
  max-width: 600px;
  width: 100%;
  padding: 2rem 5rem;
`

const FormItem = styled(StringFormItem)`
  margin-bottom: 2rem;
`

const FormButton = styled.button`
  width: 100%;
  padding: 0.8rem 0;
`

const LoginForm = () => {
  const { actions } = useLoginServiceContext()

  const { getFieldDecorator, validateFields, setFields } = useForm<{
    email: string
    password: string
  }>()

  const onSubmit = async (e: React.FormEvent, login: Function) => {
    e.preventDefault()
    e.stopPropagation()

    const values = await validateFields()

    if (!values.email || !values.password) return

    login({
      variables: values
    })
  }

  const onCompletedMutation = (data: any) => {
    // Store the token in cookie
    const { token } = data.login

    actions.login(token)
  }

  return (
    <Mutation
      mutation={LOGIN}
      onCompleted={onCompletedMutation}
      onError={(error: any) => {
        // If you want to send error to external service?
        console.log(error)
      }}
    >
      {(login: any, { data, error, loading }: any) => (
        <Form onSubmit={e => onSubmit(e, login)}>
          <FormItem
            label="Email"
            name="email"
            type="text"
            getFieldDecorator={getFieldDecorator}
            setFields={setFields}
          />
          <FormItem
            label="Password"
            name="password"
            type="password"
            getFieldDecorator={getFieldDecorator}
            setFields={setFields}
          />

          <FormButton type={'submit'}>Login</FormButton>
        </Form>
      )}
    </Mutation>
  )
}

export default LoginForm
