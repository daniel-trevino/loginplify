import {
  ISettingsState,
  ActionTypes,
  IAction
} from '../interfaces/Settings.interface'

const types: ActionTypes = {
  INIT: 'INIT'
}

const reducer: React.Reducer<ISettingsState, IAction> = (state, action) => {
  switch (action.type) {
    case types.INIT:
      return {
        ...state,
        endpoint: action.payload.endpoint
      }

    default:
      throw new Error('Unexpected action')
  }
}

export { types, reducer }
