import { Map as iMap } from 'immutable';

const initialState = iMap({slopeId: false, courseId: false, clubId: false});

export default function play(state = initialState, action) {
  switch ( action.type ) {
  case 'SELECT_ITEM':
    return state.set(action.model + 'Id', action.id);

  case 'DE_SELECT_ITEM':
    return state.set(action.model + 'Id', false);

  default:
    return state;
  }
}
