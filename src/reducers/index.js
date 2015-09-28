import { combineReducers } from 'redux';
import reduxStorage from 'redux-storage';

import play from './play';
import holes from './holes';
import clubs from './clubs';
import storage from './storage';

const rootReducer = reduxStorage.reducer(combineReducers({
  play,
  holes,
  clubs,
  storage
}));

export default rootReducer;
