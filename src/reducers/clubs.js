import { fromJS } from 'immutable';
import { values, filter, trim } from 'lodash';

const initialState = fromJS({loading: false, clubs: {}, courses: {}, slopes: {}, filteredClubs: {}});

export default function clubsReducer(state = initialState, action) {
  switch ( action.type ) {

  case 'SELECT_ITEM':
    return state.merge({filteredClubs: {}, filterQuery: undefined});

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

  case 'FILTER_ITEMS':
    const query = trim(action.filterQuery.query).toLowerCase();
    const itemsToFilter = values(state.get('clubs').toJS());
    const filteredClubs = filter(itemsToFilter, (c) => {
      const club = trim(c.name).toLowerCase();
      return club.indexOf(query) !== -1;
    });
    return state.merge({filteredClubs: filteredClubs, filterQuery: query});

  default:
    return state;
  }
}
