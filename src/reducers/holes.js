const initialState = { loading: false, holes: [], hole: false };

export default function clubs(state = initialState, action) {
  switch ( action.type ) {

  case 'REQUEST_HOLES':
    return Object.assign({}, state, {loading: true});

  case 'RECEIVE_HOLES':
    return Object.assign({}, state, {loading: false, receivedAt: action.receivedAt, holes: action.holes});

  case 'SELECT_HOLE':
    return Object.assign({}, state, {hole: action.id});

  default:
    return state;
  }
}
