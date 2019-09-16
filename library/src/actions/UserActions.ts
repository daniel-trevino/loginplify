import { types } from '../reducers/UserReducers'
import {
  IUserState,
  IAction,
  LoginServiceActions,
  IViews
} from '../interfaces/User.interface'
import { removeCookie, createTokenCookie } from '../utils/LoginUtils'

export const useActions = (
  state: IUserState,
  dispatch: (value: IAction) => void
): LoginServiceActions => {
  function setView(value: IViews) {
    dispatch({ type: types.SET_VIEW, payload: value })
  }
  function login(token: string) {
    createTokenCookie(token)
    dispatch({ type: types.SET_LOGGED_IN, payload: Boolean(token) })
    dispatch({ type: types.SET_TOKEN, payload: token })
  }
  function setIsAuthenticating(value: boolean) {
    dispatch({ type: types.SET_ISAUTHENTICATING, payload: value })
  }
  function logout() {
    removeCookie('loginplify-token')
    dispatch({ type: types.SET_LOGGED_IN, payload: false })
  }
  function resetState() {
    dispatch({ type: types.RESET_STATE, payload: true })
  }

  return {
    setView,
    setIsAuthenticating,
    login,
    logout,
    resetState
  }
}
