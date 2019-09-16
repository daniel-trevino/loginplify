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

const resetPasswordMutation = `
  mutation resetPasswordMutation($email: String!) {
    requestReset(email: $email)
  }
`

export default {
  loginMutation,
  signUpMutation,
  resetPasswordMutation
}
