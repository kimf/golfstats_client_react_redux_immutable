const initialState = {loading: false, data: []};

export default function courses(state = initialState, action) {
  switch ( action.type ) {

  case 'REQUEST_COURSES':
    return Object.assign({}, state, {loading: true});

  case 'RECEIVE_COURSES':
    return Object.assign({}, state, {loading: false, receivedAt: action.receivedAt, data: action.courses});

  case 'SELECT_COURSE':
    const currentCourse = state.data.find(course => course.id === action.id);
    return Object.assign({}, state, {currentCourse: currentCourse});

  default:
    return state;
  }
}
