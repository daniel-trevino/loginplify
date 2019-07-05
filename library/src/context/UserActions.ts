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
    login,
    logout
  }
}
