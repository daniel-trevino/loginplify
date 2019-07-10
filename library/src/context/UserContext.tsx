import React from 'react'
import { reducer, initialState } from '../reducers/UserReducers'
import { useActions } from '../actions/UserActions'
import {
  IUserState,
  IAction,
  LoginServiceContext
} from '../interfaces/User.interface'

export const UserContext = React.createContext({} as LoginServiceContext)

interface IProviderProps {
  children: React.ReactNode
}

export const UserProvider = (props: IProviderProps) => {
  // Set up reducer with useReducer and our defined reducer, initialState from reducers.js
  const [state, dispatch] = React.useReducer<
    React.Reducer<IUserState, IAction>
  >(reducer, initialState)

  // Create an object of all our actions, handling special cases where a simple dispatch is too primitive
  const actions = useActions(state, dispatch)

  return (
    <UserContext.Provider value={{ state, dispatch, actions }}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useLoginServiceContext = (): LoginServiceContext =>
  React.useContext(UserContext)

export default { UserContext, UserProvider }
