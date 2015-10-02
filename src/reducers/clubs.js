import { fromJS } from 'immutable';
import { trim } from 'lodash';

const initialState = fromJS({loading: false, clubs: [], filterQuery: ''});

export default function clubsReducer(state = initialState, action) {
  switch ( action.type ) {

  case 'REQUEST_CLUBS':
    return state.set('loading', true);

  case 'SELECT_ITEM':
    return state.merge({filterQuery: ''});

  case 'RECEIVE_CLUBS':
    return fromJS({
      loading: false,
      clubs: action.clubs,
      receivedAt: action.receivedAt,
      filterQuery: state.get('filterQuery')
    });

  case 'FILTER_ITEMS':
    const query = trim(action.filterQuery.query).toLowerCase();
    return state.merge({filterQuery: query});

  default:
    return state;
  }
}
