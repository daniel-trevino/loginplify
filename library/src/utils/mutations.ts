const loginMutation = `
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const signUpMutation = `
  mutation signUpMutation($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      token
    }
  }
`

const requestResetPasswordMutation = `
  mutation resetPasswordMutation($email: String!) {
    requestReset(email: $email)
  }
`

const resetPasswordMutation = `
  mutation resetPasswordMutation(
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

const verifyUserMutation = `
  mutation verifyUserMutation($token: String!) {
    verify(token: $token)
  }
`

export default {
  loginMutation,
  signUpMutation,
  requestResetPasswordMutation,
  resetPasswordMutation,
  verifyUserMutation
}
