import {
  ISettingsState,
  ActionTypes,
  IAction
} from '../interfaces/Settings.interface'
import theme from '../utils/theme'

const types: ActionTypes = {
  INIT: 'INIT'
}

const initialState: ISettingsState = {
  endpoint: null,
  theme: theme
}

const reducer: React.Reducer<ISettingsState, IAction> = (
  state = initialState,
  action
) => {
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

export { initialState, types, reducer }
