import { fromJS } from 'immutable';

const initialState = fromJS({ loading: false, holes: [], hole: false });

export default function holes(state = initialState, action) {
  switch ( action.type ) {

  case 'REQUEST_HOLES':
    return state.set('loading', true);

  case 'RECEIVE_HOLES':
    return fromJS({
      loading: false,
      holes: action.holes,
      receivedAt: action.receivedAt,
      hole: state.get('hole')});

  case 'SELECT_HOLE':
    return state.set('hole', action.id);

  case 'END_ROUND':
    return initialState;

  default:
    return state;
  }
}
