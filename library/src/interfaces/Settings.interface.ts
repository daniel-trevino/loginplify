export interface LoginServiceContext {
  state: ISettingsState
  dispatch: (value: IAction) => void
  actions: SettingsActions
}

export interface ISettingsObject {
  endpoint: string
}

export interface SettingsActions {
  init: (settingsObject: ISettingsObject) => void
}

export interface ISettingsState {
  endpoint?: string
}

enum ACTION_TYPE {
  INIT = 'INIT'
}
export type ActionType = keyof typeof ACTION_TYPE

export type ActionTypes = { [K in keyof typeof ACTION_TYPE]: K }

export interface IAction {
  type: ActionType
  payload: any
}
