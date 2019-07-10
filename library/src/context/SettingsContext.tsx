import React from 'react'
import { reducer } from '../reducers/SettingsReducer'
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
  const [state, dispatch] = React.useReducer<
    React.Reducer<ISettingsState, IAction>
  >(reducer, props.settings)

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
