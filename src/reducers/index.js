import { combineReducers } from 'redux';

import play     from 'reducers/play';
import clubs    from 'reducers/clubs';
// import holes    from './holes';
// import storage  from './storage';
// import nav      from './navigation';
// import scorecards      from './scorecards';


const rootReducer = combineReducers({
  play,
  clubs
});

export default rootReducer;
