import * as React from 'react'
import useForm from 'rc-form-hooks'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import StringFormItem from '../StringFormItem'
import styled from 'styled-components'
import Button from '../Button'
import TextButton from '../TextButton'
import Message from '../Message'

interface IProps {
  token: string
  backButtonText?: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
    }
  }
`

const Container = styled.div`
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
  font-size: ${(props: any) =>
    props.theme.fontSize ? props.theme.fontSize.xs : '0.8rem'};
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
    font-size: ${(props: any) =>
      props.theme.fontSize ? props.theme.fontSize.xs : '0.8rem'};
    margin: 0;
  }
`

const NewPasswordForm = (props: IProps) => {
  const { token, backButtonText, href, target } = props
  const [requestSent, setRequestSent] = React.useState(false)
  const [isPossibleValid, setIsPossibleValid] = React.useState(false)
  const [inputFields, setInputFields] = React.useState({
    password: '',
    confirmPassword: ''
  })

  const invalidFields = (values: any) =>
    !values.password || !values.confirmPassword

  const { getFieldDecorator, validateFields, setFields } = useForm<{
    password: string
    confirmPassword: string
  }>()

  const onSubmit = async (e: React.FormEvent, resetPassword: Function) => {
    e.preventDefault()
    e.stopPropagation()

    const values = await validateFields()

    if (invalidFields(values)) return

    resetPassword({
      variables: {
        ...values,
        resetToken: token
      }
    })
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

  if (!token) {
    return (
      <Message title="Invalid token">
        The token you have provided is invalid
      </Message>
    )
  }

  return (
    <Mutation mutation={RESET_PASSWORD} onCompleted={onCompletedMutation}>
      {(resetPassword: any, { data, error, loading }: any) => {
        if (requestSent) {
          return (
            <Message title="Password has been updated" success>
              <p>You may login with your new password</p>
              {backButtonText && (
                <BackButton href={href} target={target}>
                  {backButtonText}
                </BackButton>
              )}
            </Message>
          )
        }

        return (
          <Container>
            <Form onSubmit={e => onSubmit(e, resetPassword)}>
              <h2>Create new password</h2>
              <p>Write a new password to your account</p>
              <FormItem
                label="New password"
                name="password"
                type="password"
                placeholder="New password"
                getFieldDecorator={getFieldDecorator}
                setFields={setFields}
                onChange={onChangeField}
              />
              <FormItem
                label="Confirm new password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
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

              {error && (
                <ErrorWrapper>
                  <p>{error.message}</p>
                </ErrorWrapper>
              )}
            </Form>
          </Container>
        )
      }}
    </Mutation>
  )
}

export default NewPasswordForm
