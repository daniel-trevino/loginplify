import { types } from './UserReducers'
import { IUserState, IAction } from '../interfaces/User.interface'

export const useActions = (
  state: IUserState,
  dispatch: (value: IAction) => void
) => {
  function login(value: boolean = true) {
    dispatch({ type: types.SET_LOGGED_IN, payload: value })
  }
  function logout(value: boolean = false) {
    dispatch({ type: types.SET_LOGGED_IN, payload: value })
  }

  return {
    login,
    logout
  }
}
