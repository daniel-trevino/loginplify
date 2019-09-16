import * as React from 'react'
import useForm from 'rc-form-hooks'
import StringFormItem from '../StringFormItem'
import { useLoginServiceContext } from '../../context/UserContext'
import styled from 'styled-components'
import Button from '../Button'
import TextButton from '../TextButton'
import Message from '../Message'
import mutations from '../../utils/mutations'
import MainApi from '../../utils/api/MainApi'
import { useSettingsContext } from '../../context/SettingsContext'

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
  const { state } = useSettingsContext()
  const endpoint = state.endpoint
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState(null)
  const [requestSent, setRequestSent] = React.useState(false)
  const [isPossibleValid, setIsPossibleValid] = React.useState(false)
  const [inputFields, setInputFields] = React.useState({
    email: ''
  })

  const invalidFields = (values: any) => values.email.length < 3

  const { getFieldDecorator, validateFields, setFields } = useForm<{
    email: string
  }>()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const values = await validateFields()

    if (invalidFields(values)) return

    const body = {
      query: mutations.resetPasswordMutation,
      variables: values
    }

    setLoading(true)
    const { data } = await MainApi.post(endpoint, body)
    setLoading(false)
    if (data.errors) {
      setError(data.errors[0])
      return
    }

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

  if (requestSent) {
    return (
      <Message title="Success" success>
        <p>The reset password email has been sent!</p>
        <BackButton onClick={() => actions.setView('login')}>
          Go back to login screen
        </BackButton>
      </Message>
    )
  }

  return (
    <LoginContainer>
      <Form onSubmit={e => onSubmit(e)}>
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

        <Button type="submit" loading={loading} disabled={!isPossibleValid}>
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
}

export default ResetPasswordForm
