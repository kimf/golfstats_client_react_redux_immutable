import { fromJS } from 'immutable';

const initialState = fromJS({loading: false, slope: false, course: false, club: false, shots: [], holes: []});

// // normally this would be imported from /constants, but in trying to keep
// // this starter kit as small as possible we'll just define it here.
// const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

// export default createReducer(initialState, {
//   [COUNTER_INCREMENT] : (state) => state + 1
// });

export default function play(state = initialState, action) {
  switch ( action.type ) {

  case 'SELECT_ITEM':
    return state.set(action.model, fromJS(action.item));

  case 'DE_SELECT_ITEM':
    return state.set(action.model, false);

  case 'REQUEST_HOLES':
    return state.set('loading', true);

  case 'RECEIVE_HOLES':
    return state.merge({holes: fromJS(action.holes), loading: false});

  case 'ADD_SHOT':
    // wait for pushIn!
    return state.updateIn('shots', list => list.push(action.shot));
    // return state.updateIn(['shots'], iList(), list => list.push(action.shot));

  case 'REMOVE_SHOT':
    return state.removeIn(['shots', action.index]);

  case 'END_ROUND':
    return initialState;

  default:
    return state;
  }
}
