import { combineReducers } from 'redux';

import play from './play';
import holes from './holes';
import clubs from './clubs';

const rootReducer = combineReducers({
  play,
  holes,
  clubs
});

export default rootReducer;
