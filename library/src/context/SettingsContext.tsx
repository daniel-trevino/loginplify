import React from 'react'
import { reducer, initialState } from '../reducers/SettingsReducer'
import { useActions } from '../actions/SettingsActions'
import {
  ISettingsState,
  IAction,
  LoginServiceContext
} from '../interfaces/Settings.interface'

export const SettingsContext = React.createContext({} as LoginServiceContext)

interface IProviderProps {
  settings: ISettingsState
  children: React.ReactNode
}

export const SettingsProvider = (props: IProviderProps) => {
  // Set up reducer with useReducer and our defined reducer, initialState from reducers.js
  let mergedTheme = initialState.theme
  if (props.settings.theme) {
    mergedTheme = {
      ...mergedTheme,
      ...props.settings.theme
    }
  }
  const initialStateMerged = {
    endpoint: props.settings.endpoint || initialState.endpoint,
    theme: mergedTheme
  }

  const [state, dispatch] = React.useReducer<
    React.Reducer<ISettingsState, IAction>
  >(reducer, initialStateMerged)

  // Create an object of all our actions, handling special cases where a simple dispatch is too primitive
  const actions = useActions(state, dispatch)

  return (
    <SettingsContext.Provider value={{ state, dispatch, actions }}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export const useSettingsContext = (): LoginServiceContext =>
  React.useContext(SettingsContext)

export default { SettingsContext, SettingsProvider }
