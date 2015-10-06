import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import play from 'reducers/play';
import clubs from 'reducers/clubs';
// import holes    from './holes';
// import storage  from './storage';
// import nav      from './navigation';
// import scorecards      from './scorecards';


const rootReducer = combineReducers({
  router: routerStateReducer,
  play,
  clubs
});

export default rootReducer;
