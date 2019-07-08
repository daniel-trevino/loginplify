export interface LoginServiceContext {
  state: IUserState
  dispatch: (value: IAction) => void
  actions: LoginServiceActions
}

export interface LoginServiceActions {
  toSignUp: (value?: boolean) => void
  login: (token: string) => void
  logout: () => void
  resetState: () => void
}

export interface IUserState {
  signingUp: boolean
  loggedIn: boolean
  token: string | null
}

enum ACTION_TYPE {
  WANTS_TO_SIGNUP = 'WANTS_TO_SIGNUP',
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_TOKEN = 'SET_TOKEN',
  RESET_STATE = 'RESET_STATE'
}
export type ActionType = keyof typeof ACTION_TYPE

export type ActionTypes = { [K in keyof typeof ACTION_TYPE]: K }

export interface IAction {
  type: ActionType
  payload: any
}
