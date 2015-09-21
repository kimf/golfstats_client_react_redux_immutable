const initialState = {loading: false, clubs: []};

export default function clubs(state = initialState, action) {
  switch ( action.type ) {

  case 'REQUEST_CLUBS':
    return Object.assign({}, state, {loading: true});

  case 'RECEIVE_CLUBS':
    return Object.assign({}, state, {loading: false, receivedAt: action.receivedAt, clubs: action.clubs});

  case 'SELECT_CLUB':
    const currentClub = state.clubs.find(club => club.id === action.id);
    return Object.assign({}, {currentClub: currentClub});

  case 'SELECT_COURSE':
    const currentCourse = state.currentClub.courses.find(course => course.id === action.id);
    return Object.assign({}, {currentCourse: currentCourse, currentClub: {name: state.currentClub.name}});

  default:
    return state;
  }
}
