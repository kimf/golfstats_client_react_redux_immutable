import { fromJS, List as iList } from 'immutable';

const initialState = fromJS({slopeId: false, courseId: false, clubId: false, shots: []});

export default function play(state = initialState, action) {
  switch ( action.type ) {
  case 'SELECT_ITEM':
  case 'SELECT_LAST_ITEM':
    return state.set(action.model + 'Id', action.id);

  case 'DE_SELECT_ITEM':
    return state.set(action.model + 'Id', false);

  case 'END_ROUND':
    return initialState;

  case 'ADD_SHOT':
    // wait for pushIn!
    return state.updateIn(['shots'], iList(), list => list.push(action.shot));

  case 'REMOVE_SHOT':
    return state.removeIn(['shots', action.index]);

  default:
    return state;
  }
}
