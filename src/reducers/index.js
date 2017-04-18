import { combineReducers } from 'redux'
import { REHYDRATE } from 'redux-persist/constants'

import play from 'reducers/play'
import clubs from 'reducers/clubs'
// import holes    from './holes';
// import storage  from './storage';
// import nav      from './navigation';
// import scorecards      from './scorecards';

const appReducer = (state = { rehydrated: false }, action) => {
  switch (action.type) {
    case REHYDRATE:
      return { rehydrated: true }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  appReducer,
  play,
  clubs
})

export default rootReducer
