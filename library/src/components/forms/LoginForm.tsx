import * as React from 'react'
import useForm from 'rc-form-hooks'
import StringFormItem from '../StringFormItem'
import { useLoginServiceContext } from '../../context/UserContext'
import styled from 'styled-components'
import Button from '../Button'
import TextButton from '../../components/TextButton'
import { useSettingsContext } from '../../context/SettingsContext'
import MainApi from '../../utils/api/MainApi'
import mutations from '../../utils/mutations'

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
  color: ${(props: any) => props.theme.darkGray};
  font-size: ${(props: any) => props.theme.fontSize.xs};

  span {
    color: ${(props: any) => props.theme.primaryColor};
    cursor: pointer;
  }
`

const ErrorWrapper = styled.div`
  background-color: ${(props: any) => props.theme.dangerColor};
  opacity: 1;
  transition-duration: 0.3s;
  border: 1px solid ${(props: any) => props.theme.dangerBorder};

  p {
    text-align: center;
    padding: 0.3rem;
    font-size: ${(props: any) => props.theme.fontSize.xs};
    margin: 0;
  }
`

const ForgotPasswordButton = styled(TextButton)`
  color: ${(props: any) => props.theme.darkGray};
  margin: 0;
  font-size: ${(props: any) => props.theme.fontSize.xs};
`

const ActionButton = styled(Button)`
  margin-top: ${(props: any) => props.theme.fontSize.md};
`

const LoginForm = () => {
  const { actions, state } = useLoginServiceContext()
  const settingsContext = useSettingsContext()
  const endpoint = settingsContext.state.endpoint
  const [loading, setLoading] = React.useState<boolean>(false)
  const [isPossibleValid, setIsPossibleValid] = React.useState<boolean>(false)
  const [error, setError] = React.useState(null)
  const [inputFields, setInputFields] = React.useState<{
    name: string
    email: string
    password: string
  }>({
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const values = await validateFields()

    if (invalidFields(values)) return

    const mutation = signUpView
      ? mutations.signUpMutation
      : mutations.loginMutation
    const body = {
      query: mutation,
      variables: values
    }

    setLoading(true)
    const { data } = await MainApi.post(endpoint, body)
    setLoading(false)
    if (data.errors) {
      setError(data.errors[0])
      return
    }
    onCompletedMutation(data.data)
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
    <>
      Already have an account?
      <TextButton
        onClick={() => actions.setView('login')}
        style={{ display: 'inline-flex', marginLeft: '0.3rem' }}
      >
        Login
      </TextButton>
    </>
  ) : (
    <>
      Dont have an account yet?
      <TextButton
        onClick={() => actions.setView('signup')}
        style={{ display: 'inline-flex', marginLeft: '0.3rem' }}
      >
        Sign up
      </TextButton>
    </>
  )

  const titleText = signUpView ? 'Sign up' : 'Login'
  const buttonText = signUpView ? 'Sign Up' : 'Login'

  return (
    <LoginContainer>
      <Form onSubmit={e => onSubmit(e)}>
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
          <ForgotPasswordButton onClick={() => actions.setView('requestReset')}>
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
}

export default LoginForm
