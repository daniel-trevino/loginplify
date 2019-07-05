import { IUserState, ActionTypes, IAction } from '../interfaces/User.interface'

const initialState: IUserState = {
  loggedIn: false
}

const types: ActionTypes = {
  SET_LOGGED_IN: 'SET_LOGGED_IN',
  SET_USER: 'SET_USER'
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
    default:
      throw new Error('Unexpected action')
  }
}

export { initialState, types, reducer }
