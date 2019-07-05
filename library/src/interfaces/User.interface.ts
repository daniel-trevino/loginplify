export interface LoginServiceContext {
  state: IUserState
  dispatch: (value: IAction) => void
  actions: LoginServiceActions
}

export interface LoginServiceActions {
  login: (token: string) => void
  logout: () => void
}

export interface IUserState {
  loggedIn: boolean
  token: string | null
}

enum ACTION_TYPE {
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_TOKEN = 'SET_TOKEN'
}
export type ActionType = keyof typeof ACTION_TYPE

export type ActionTypes = { [K in keyof typeof ACTION_TYPE]: K }

export interface IAction {
  type: ActionType
  payload: any
}
