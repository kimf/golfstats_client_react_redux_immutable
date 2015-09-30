import { combineReducers } from 'redux';
import reduxStorage from 'redux-storage';

import play     from './play';
import holes    from './holes';
import clubs    from './clubs';
import storage  from './storage';
import nav      from './navigation';
import scorecards      from './scorecards';

const rootReducer = reduxStorage.reducer(combineReducers({
  nav,
  play,
  holes,
  clubs,
  scorecards,
  storage
}));

export default rootReducer;
