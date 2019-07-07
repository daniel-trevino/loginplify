import Cookies from 'js-cookie'
import { IUserState, ActionTypes, IAction } from '../interfaces/User.interface'

const currentToken = Cookies.get('token')

const initialState: IUserState = {
  loggedIn: Boolean(currentToken) || false,
  token: currentToken
}

const types: ActionTypes = {
  SET_LOGGED_IN: 'SET_LOGGED_IN',
  SET_TOKEN: 'SET_TOKEN'
}

const reducer: React.Reducer<IUserState, IAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
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
    default:
      throw new Error('Unexpected action')
  }
}

export { initialState, types, reducer }
