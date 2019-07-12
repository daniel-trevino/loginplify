import * as React from 'react'
import useForm from 'rc-form-hooks'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import StringFormItem from '../StringFormItem'
import { useLoginServiceContext } from '../../context/UserContext'
import styled from 'styled-components'
import Button from '../Button'
import TextButton from '../TextButton'
import { dangerColor, dangerBorder } from '../../utils/vars'

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

const BackButton = styled(TextButton)`
  margin-top: 1rem;
  font-size: 0.8rem;
  width: 100%;
  text-align: center;
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

const ResetPasswordForm = () => {
  const { actions, state } = useLoginServiceContext()
  const [isPossibleValid, setIsPossibleValid] = React.useState(false)
  const [inputFields, setInputFields] = React.useState({
    email: ''
  })

  const invalidFields = (values: any) => values.email.length < 3

  const { getFieldDecorator, validateFields, setFields } = useForm<{
    email: string
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
    const { token } = state.view === 'signup' ? data.signUp : data.login

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

  return (
    <Mutation mutation={LOGIN} onCompleted={onCompletedMutation}>
      {(login: any, { data, error, loading }: any) => {
        return (
          <LoginContainer>
            <Form onSubmit={e => onSubmit(e, login)}>
              <h2>Reset your password</h2>
              <p>Write your email and you will receive a password reset link</p>
              <FormItem
                label="Email"
                name="email"
                type="text"
                placeholder="Email address"
                getFieldDecorator={getFieldDecorator}
                setFields={setFields}
                onChange={onChangeField}
              />

              <Button
                type="submit"
                loading={loading}
                disabled={!isPossibleValid}
              >
                Reset password
              </Button>

              <BackButton onClick={() => actions.setView('login')}>
                Send me back to the login screen
              </BackButton>
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

export default ResetPasswordForm
