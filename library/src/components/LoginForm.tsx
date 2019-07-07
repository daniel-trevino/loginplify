import * as React from 'react'
import useForm from 'rc-form-hooks'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import StringFormItem from '../components/StringFormItem'
import { useLoginServiceContext } from '../context/UserContext'
import styled from 'styled-components'
import Button from './Button'

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const LoginContainer = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Form = styled.form`
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 3em;
  min-width: 400px;
`

const FormItem = styled(StringFormItem)`
  margin-bottom: 1rem;
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
        <LoginContainer>
          <Form onSubmit={e => onSubmit(e, login)}>
            <FormItem
              label="Email"
              name="email"
              type="text"
              placeholder="Email address"
              getFieldDecorator={getFieldDecorator}
              setFields={setFields}
            />
            <FormItem
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              getFieldDecorator={getFieldDecorator}
              setFields={setFields}
            />

            <Button type="submit" loading={loading}>
              Login
            </Button>
          </Form>
        </LoginContainer>
      )}
    </Mutation>
  )
}

export default LoginForm
