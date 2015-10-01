import { fromJS, List as iList } from 'immutable';
import { values, filter, trim } from 'lodash';

const initialState = fromJS({loading: false, clubs: {}, courses: {}, slopes: {}, filteredClubs: [], filterQuery: ''});

export default function clubsReducer(state = initialState, action) {
  switch ( action.type ) {

  case 'REQUEST_CLUBS':
    return state.set('loading', true);

  case 'SELECT_ITEM':
    return state.merge({filteredClubs: [], filterQuery: ''});

  case 'RECEIVE_CLUBS':
    const clubs = filter(action.clubs.entities.clubs, (i) => i.courses.length > 0);
    const courses = filter(action.clubs.entities.courses, (i) => i.slopes.length > 0);
    const slopes = filter(action.clubs.entities.slopes, (i) => i.length > 0);
    return fromJS({
      loading: false,
      clubs: clubs,
      courses: courses,
      slopes: slopes,
      receivedAt: action.receivedAt,
      filteredClubs: [],
      filterQuery: state.get('filterQuery')
    });

  case 'FILTER_ITEMS':
    const query = trim(action.filterQuery.query).toLowerCase();
    const itemsToFilter = values(state.get('clubs').toJS());
    const filteredClubs = filter(itemsToFilter, (c) => {
      const club = trim(c.name).toLowerCase();
      return club.indexOf(query) !== -1;
    });
    return state.merge({filteredClubs: iList(filteredClubs), filterQuery: query});

  default:
    return state;
  }
}
