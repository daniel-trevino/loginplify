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
  function toSignUp(value: boolean = true) {
    dispatch({ type: types.WANTS_TO_SIGNUP, payload: value })
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
  function resetState() {
    dispatch({ type: types.RESET_STATE, payload: true })
  }

  return {
    toSignUp,
    login,
    logout,
    resetState
  }
}
