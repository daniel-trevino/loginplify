import Cookies from 'js-cookie'
import { IUserState, ActionTypes, IAction } from '../interfaces/User.interface'

const currentToken = Cookies.get('token')

const initialState: IUserState = {
  view: 'login',
  loggedIn: Boolean(currentToken) || false,
  token: currentToken
}

const types: ActionTypes = {
  SET_VIEW: 'SET_VIEW',
  SET_LOGGED_IN: 'SET_LOGGED_IN',
  SET_TOKEN: 'SET_TOKEN',
  RESET_STATE: 'RESET_STATE'
}

const reducer: React.Reducer<IUserState, IAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case types.SET_VIEW:
      return {
        ...state,
        view: action.payload
      }
    case types.SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload
      }
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case types.RESET_STATE:
      return {
        ...state,
        view: initialState.view
      }

    default:
      throw new Error('Unexpected action')
  }
}

export { initialState, types, reducer }
