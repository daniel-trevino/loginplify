import { types } from '../reducers/SettingsReducer'
import {
  ISettingsState,
  IAction,
  SettingsActions,
  ISettingsObject
} from '../interfaces/Settings.interface'

export const useActions = (
  state: ISettingsState,
  dispatch: (value: IAction) => void
): SettingsActions => {
  function init(initObject: ISettingsObject) {
    dispatch({ type: types.INIT, payload: initObject })
  }

  return {
    init
  }
}
