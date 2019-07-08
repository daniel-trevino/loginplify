import Cookies from 'js-cookie'
import { IUserState, ActionTypes, IAction } from '../interfaces/User.interface'

const currentToken = Cookies.get('token')

const initialState: IUserState = {
  signingUp: false,
  loggedIn: Boolean(currentToken) || false,
  token: currentToken
}

const types: ActionTypes = {
  WANTS_TO_SIGNUP: 'WANTS_TO_SIGNUP',
  SET_LOGGED_IN: 'SET_LOGGED_IN',
  SET_TOKEN: 'SET_TOKEN',
  RESET_STATE: 'RESET_STATE'
}

const reducer: React.Reducer<IUserState, IAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case types.WANTS_TO_SIGNUP:
      return {
        ...state,
        signingUp: action.payload
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
        signingUp: initialState.signingUp
      }

    default:
      throw new Error('Unexpected action')
  }
}

export { initialState, types, reducer }
