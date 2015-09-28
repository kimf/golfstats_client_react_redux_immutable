import { Map as iMap, List as iList } from 'immutable';

const initialState = iMap({ loading: false, holes: iList(), hole: false });

export default function holes(state = initialState, action) {
  switch ( action.type ) {

  case 'REQUEST_HOLES':
    return state.set('loading', true);

  case 'RECEIVE_HOLES':
    return state.mergeDeep({
      loading: false,
      receivedAt: action.receivedAt,
      holes: action.holes});

  case 'SELECT_HOLE':
    return state.set('hole', action.id);

  case 'END_ROUND':
    return initialState;

  default:
    return state;
  }
}
