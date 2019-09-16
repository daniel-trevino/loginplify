export interface LoginServiceContext {
  state: IUserState
  dispatch: (value: IAction) => void
  actions: LoginServiceActions
}

export interface LoginServiceActions {
  setView: (value: IViews) => void
  login: (token: string) => void
  setIsAuthenticating: (value: boolean) => void
  logout: () => void
  resetState: () => void
}

export type IViews = 'login' | 'signup' | 'requestReset'

export interface IUserState {
  view: IViews
  loggedIn: boolean
  token: string | null
  isAuthenticating: boolean
}

enum ACTION_TYPE {
  SET_VIEW = 'SET_VIEW',
  SET_LOGGED_IN = 'SET_LOGGED_IN',
  SET_TOKEN = 'SET_TOKEN',
  SET_ISAUTHENTICATING = 'SET_ISAUTHENTICATING',
  RESET_STATE = 'RESET_STATE'
}
export type ActionType = keyof typeof ACTION_TYPE

export type ActionTypes = { [K in keyof typeof ACTION_TYPE]: K }

export interface IAction {
  type: ActionType
  payload: any
}
