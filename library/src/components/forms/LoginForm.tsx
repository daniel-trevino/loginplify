import * as React from 'react'
import useForm from 'rc-form-hooks'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import StringFormItem from '../StringFormItem'
import { useLoginServiceContext } from '../../context/UserContext'
import styled from 'styled-components'
import Button from '../Button'
import {
  darkGray,
  primaryColor,
  dangerColor,
  dangerBorder
} from '../../utils/vars'
import TextButton from '../../components/TextButton'

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

const InfoText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  p {
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

const ForgotPasswordButton = styled(TextButton)`
  color: ${darkGray};
  margin: 0;
  font-size: 0.8rem;
`

const ActionButton = styled(Button)`
  margin-top: 1.3rem;
`

const LoginForm = () => {
  const { actions, state } = useLoginServiceContext()
  const [isPossibleValid, setIsPossibleValid] = React.useState(false)
  const [inputFields, setInputFields] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const signUpView = state.view === 'signup'
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
    const signUpView = state.view === 'signup'
    const { token } = signUpView ? data.signUp : data.login

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

  const infoText = signUpView ? (
    <p>
      Already have an account?{' '}
      <TextButton
        onClick={() => actions.setView('login')}
        style={{ display: 'inline-flex' }}
      >
        Login
      </TextButton>
    </p>
  ) : (
    <p>
      Dont have an account yet?{' '}
      <TextButton
        onClick={() => actions.setView('signup')}
        style={{ display: 'inline-flex' }}
      >
        Sign up
      </TextButton>
    </p>
  )

  const titleText = signUpView ? 'Sign up' : 'Login'
  const buttonText = signUpView ? 'Sign Up' : 'Login'
  const mutation = signUpView ? SIGN_UP : LOGIN

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
              <h2>{titleText}</h2>
              <p>Enter your details below</p>
              {signUpView && (
                <StringFormItem
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  getFieldDecorator={getFieldDecorator}
                  setFields={setFields}
                  onChange={onChangeField}
                />
              )}
              <StringFormItem
                label="Email"
                name="email"
                type="text"
                placeholder="Email address"
                getFieldDecorator={getFieldDecorator}
                setFields={setFields}
                onChange={onChangeField}
              />
              <StringFormItem
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                getFieldDecorator={getFieldDecorator}
                setFields={setFields}
                onChange={onChangeField}
                noMargin
              />
              {!signUpView && (
                <ForgotPasswordButton
                  onClick={() => actions.setView('requestReset')}
                >
                  Forgot password?
                </ForgotPasswordButton>
              )}

              <ActionButton
                type="submit"
                loading={loading}
                disabled={!isPossibleValid}
              >
                {buttonText}
              </ActionButton>

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
