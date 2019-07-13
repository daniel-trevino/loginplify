export interface LoginServiceContext {
  state: ISettingsState
  dispatch: (value: IAction) => void
  actions: SettingsActions
}

export interface ISettingsObject {
  endpoint: string
}

export interface ITheme {
  fontSize?: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  white?: string
  fontColor?: string
  primaryColor?: string
  lightGray?: string
  darkGray?: string
  bordercolor?: string
  dangerBorder?: string
  dangerColor?: string
}

export interface SettingsActions {
  init: (settingsObject: ISettingsObject) => void
}

export interface ISettingsState {
  endpoint?: string
  theme?: any
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
