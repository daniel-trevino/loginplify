import * as React from 'react'
import useForm from 'rc-form-hooks'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import StringFormItem from '../components/StringFormItem'
import { useLoginServiceContext } from '../context/UserContext'
import styled from 'styled-components'
import Button from './Button'
import {
  darkGray,
  primaryColor,
  dangerColor,
  dangerBorder
} from '../utils/vars'

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const SIGN_UP = gql`
  mutation SIGN_UP($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      token
    }
  }
`

const LoginContainer = styled.div`
  display: block;
  max-width: 600px;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const Form = styled.form`
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 3em;
`

const FormItem = styled(StringFormItem)`
  margin-bottom: 1rem;
`

const InfoText = styled.div`
  display: flex;
  justify-content: center;
  p {
    font-size: 0.8rem;
    color: ${darkGray};
  }

  span {
    color: ${primaryColor};
    cursor: pointer;
  }
`

const ErrorWrapper = styled.div`
  background-color: ${dangerColor};
  opacity: 1;
  transition-duration: 0.3s;
  border: 1px solid ${dangerBorder};

  p {
    text-align: center;
    padding: 0.3rem;
    font-size: 0.8rem;
    margin: 0;
  }
`

const LoginForm = () => {
  const { actions, state } = useLoginServiceContext()
  const [isPossibleValid, setIsPossibleValid] = React.useState(false)
  const [inputFields, setInputFields] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const invalidFields = (values: any) => !values.email || !values.password

  const { getFieldDecorator, validateFields, setFields } = useForm<{
    email: string
    password: string
  }>()

  const onSubmit = async (e: React.FormEvent, login: Function) => {
    e.preventDefault()
    e.stopPropagation()

    const values = await validateFields()

    if (invalidFields(values)) return

    login({
      variables: values
    })
  }

  const onCompletedMutation = (data: any) => {
    // Store the token in cookie
    const { token } = state.signingUp ? data.signUp : data.login

    actions.login(token)

    actions.resetState()
  }

  const onChangeField = async (e: any) => {
    const fields = {
      ...inputFields,
      [e.target.name]: e.target.value
    }
    setInputFields(fields)

    if (!invalidFields(fields)) {
      setIsPossibleValid(true)
    } else {
      setIsPossibleValid(false)
    }
  }

  const infoText = state.signingUp ? (
    <p>
      Already have an account?{' '}
      <span onClick={() => actions.toSignUp(false)}>Login</span>
    </p>
  ) : (
    <p>
      Dont have an account yet?{' '}
      <span onClick={() => actions.toSignUp()}>Sign up</span>
    </p>
  )

  const buttonText = state.signingUp ? 'Sign Up' : 'Login'
  const mutation = state.signingUp ? SIGN_UP : LOGIN

  return (
    <Mutation
      mutation={mutation}
      onCompleted={onCompletedMutation}
      onError={(error: any) => {
        // If you want to send error to external service?
        console.log(error)
      }}
    >
      {(login: any, { data, error, loading }: any) => {
        return (
          <LoginContainer>
            <Form onSubmit={e => onSubmit(e, login)}>
              {state.signingUp && (
                <FormItem
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  getFieldDecorator={getFieldDecorator}
                  setFields={setFields}
                  onChange={onChangeField}
                />
              )}
              <FormItem
                label="Email"
                name="email"
                type="text"
                placeholder="Email address"
                getFieldDecorator={getFieldDecorator}
                setFields={setFields}
                onChange={onChangeField}
              />
              <FormItem
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                getFieldDecorator={getFieldDecorator}
                setFields={setFields}
                onChange={onChangeField}
              />

              <Button
                type="submit"
                loading={loading}
                disabled={!isPossibleValid}
              >
                {buttonText}
              </Button>

              <InfoText>{infoText}</InfoText>

              {error && (
                <ErrorWrapper>
                  <p>{error.message}</p>
                </ErrorWrapper>
              )}
            </Form>
          </LoginContainer>
        )
      }}
    </Mutation>
  )
}

export default LoginForm
