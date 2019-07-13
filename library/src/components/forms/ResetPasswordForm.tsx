import * as React from 'react'
import useForm from 'rc-form-hooks'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import StringFormItem from '../StringFormItem'
import { useLoginServiceContext } from '../../context/UserContext'
import styled from 'styled-components'
import Button from '../Button'
import TextButton from '../TextButton'
import SuccessMessage from '../SuccessMessage'

const REQUEST_PASSWORD = gql`
  mutation REQUEST_PASSWORD($email: String!) {
    requestReset(email: $email)
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
  font-size: ${(props: any) => props.theme.fontSize.xs};
  width: 100%;
  text-align: center;
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

const ResetPasswordForm = () => {
  const { actions } = useLoginServiceContext()
  const [requestSent, setRequestSent] = React.useState(false)
  const [isPossibleValid, setIsPossibleValid] = React.useState(false)
  const [inputFields, setInputFields] = React.useState({
    email: ''
  })

  const invalidFields = (values: any) => values.email.length < 3

  const { getFieldDecorator, validateFields, setFields } = useForm<{
    email: string
  }>()

  const onSubmit = async (e: React.FormEvent, requestReset: Function) => {
    e.preventDefault()
    e.stopPropagation()

    const values = await validateFields()

    if (invalidFields(values)) return

    requestReset({ variables: values })
  }

  const onCompletedMutation = (data: any) => {
    setRequestSent(true)
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
    <Mutation mutation={REQUEST_PASSWORD} onCompleted={onCompletedMutation}>
      {(requestReset: any, { data, error, loading }: any) => {
        if (requestSent) {
          return (
            <SuccessMessage title="Success">
              <p>The reset password email has been sent!</p>
              <BackButton onClick={() => actions.setView('login')}>
                Go back to login screen
              </BackButton>
            </SuccessMessage>
          )
        }

        return (
          <LoginContainer>
            <Form onSubmit={e => onSubmit(e, requestReset)}>
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
