import { fromJS } from 'immutable';

const initialState = fromJS({loading: false, clubs: {}, courses: {}, slopes: {}});
// import { filter } from 'lodash';

export default function clubsReducer(state = initialState, action) {
  switch ( action.type ) {

  // case 'SELECT_ITEM':
  //   let newState = {};
  //   if ( action.model === 'club' ) {
  //     const courses = filter(state.courses, { club_id: action.id });
  //     newState = { clubs: {}, courses: courses };
  //   } else if ( action.model === 'course' ) {
  //     const slopes = filter(state.slopes, { courses: {}, course_id: action.id });
  //     newState = { slopes: slopes };
  //   } else if ( action.model === 'slope' ) {
  //     newState = { clubs: {}, courses: {}, slopes: {} };
  //   }
  //   return Object.assign({}, state, newState);

  case 'REQUEST_CLUBS':
    return state.set('loading', true);

  case 'RECEIVE_CLUBS':
    const clubs = action.clubs.entities.clubs;
    const courses = action.clubs.entities.courses;
    const slopes = action.clubs.entities.slopes;
    return fromJS({
      loading: false,
      clubs: clubs,
      courses: courses,
      slopes: slopes,
      receivedAt: action.receivedAt
    });

  default:
    return state;
  }
}
