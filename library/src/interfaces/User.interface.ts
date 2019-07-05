export interface IUserState {
  loggedIn: boolean
}

enum ACTION_TYPE {
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_USER = 'SET_USER'
}
export type ActionType = keyof typeof ACTION_TYPE

export type ActionTypes = { [K in keyof typeof ACTION_TYPE]: K }

export interface IAction {
  type: ActionType
  payload: any
}
