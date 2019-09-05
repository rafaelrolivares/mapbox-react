import { store } from './store'
import { SET_ACTIVE_OPTION } from '../constants'

export const setActiveOption = option => {
  store.dispatch({
    type: SET_ACTIVE_OPTION,
    option
  });
}
