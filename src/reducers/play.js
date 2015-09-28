const initialState = {slopeId: false, courseId: false, clubId: false};

export default function play(state = initialState, action) {
  switch ( action.type ) {
  case 'SELECT_ITEM':
    const itemObject = {};
    itemObject[action.model + 'Id'] = action.id;
    return Object.assign({}, state, itemObject);

  case 'DE_SELECT_ITEM':
    state[action.model + 'Id'] = false;
    return Object.assign({}, state);

  default:
    return state;
  }
}
