import { types } from './UserReducers'
import {
  IUserState,
  IAction,
  LoginServiceActions
} from '../interfaces/User.interface'
import { removeCookie, createTokenCookie } from '../utils/LoginUtils'

export const useActions = (
  state: IUserState,
  dispatch: (value: IAction) => void
): LoginServiceActions => {
  function signUp() {
    dispatch({ type: types.WANTS_TO_SIGNUP, payload: true })
  }
  function login(token: string) {
    createTokenCookie(token)
    dispatch({ type: types.SET_LOGGED_IN, payload: Boolean(token) })
    dispatch({ type: types.SET_TOKEN, payload: token })
  }
  function logout() {
    removeCookie('token')
    dispatch({ type: types.SET_LOGGED_IN, payload: false })
  }

  return {
    signUp,
    login,
    logout
  }
}
