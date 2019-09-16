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

export default {
  loginMutation,
  signUpMutation
}
