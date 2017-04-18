const initialState = {
  loading: false,
  clubs: [],
  filterQuery: ''
}

export default function clubsReducer(state = initialState, action) {
  switch (action.type) {

    case 'REQUEST_CLUBS':
      return { ...state, loading: true }

    case 'SELECT_ITEM':
      return { ...state, filterQuery: '' }

    case 'RECEIVE_CLUBS':
      return {
        ...state,
        loading: false,
        clubs: action.clubs,
        receivedAt: action.receivedAt
      }

    case 'FILTER_ITEMS':
      return {
        ...state,
        filterQuery: action.filterQuery.trim().toLowerCase()
      }

    default:
      return state
  }
}
