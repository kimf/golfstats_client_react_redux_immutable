const initialState = {loading: false, clubs: []};

export default function clubs(state = initialState, action) {
  switch ( action.type ) {

  case 'REQUEST_CLUBS':
    return Object.assign({}, state, {loading: true});

  case 'RECEIVE_CLUBS':
    return Object.assign({}, state, {loading: false, receivedAt: action.receivedAt, clubs: action.clubs});

  case 'SELECT_WITH_ID':
    switch ( action.model ) {
    case 'TEE':
      const currentTee = state.currentCourse.slopes.find(slope => slope.id === action.id);
      return Object.assign({}, {
        currentTee: currentTee,
        currentCourse: {name:  state.currentCourse.name},
        currentClub: {name: state.currentClub.name}
      });
    case 'COURSE':
      const currentCourse = state.currentClub.courses.find(course => course.id === action.id);
      return Object.assign({}, {currentCourse: currentCourse, currentClub: {name: state.currentClub.name}});
    case 'CLUB':
      const currentClub = state.clubs.find(club => club.id === action.id);
      return Object.assign({}, {currentClub: currentClub});
    default:
      return state;
    }
  /* falls through */

  default:
    return state;
  }
}
