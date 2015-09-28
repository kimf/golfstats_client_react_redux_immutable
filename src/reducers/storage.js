import { LOAD } from 'redux-storage';

export default function storeageAwareReducer(state = { loaded: false }, action) {
  switch (action.type) {
  case LOAD:
    return { ...state, loaded: true };

  default:
    return state;
  }
}
