import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';


const club = new Schema('clubs');
const course = new Schema('courses');
const slope = new Schema('slopes');

club.define({
  courses: arrayOf(course)
});

course.define({
  club: club,
  slopes: arrayOf(slope)
});

slope.define({
  course: course
});


export const REQUEST_CLUBS = 'REQUEST_CLUBS';
function requestClubs() {
  return {
    type: REQUEST_CLUBS
  };
}

export const RECEIVE_CLUBS = 'RECEIVE_CLUBS';
function receiveClubs(json) {
  // const clubs = { clubs: json.clubs.slice(0, 10) };

  const response = normalize(json, {
    clubs: arrayOf(club)
  });

  return {
    type: RECEIVE_CLUBS,
    clubs: response,
    receivedAt: Date.now()
  };
}

export const SELECT_ITEM = 'SELECT_ITEM';
export function selectItem(model, id) {
  return {
    type: SELECT_ITEM,
    model: model,
    id: id
  };
}

export const DE_SELECT_ITEM = 'DE_SELECT_ITEM';
export function deSelectItem(model) {
  return {
    type: DE_SELECT_ITEM,
    model: model
  };
}

export const FILTER_ITEMS = 'FILTER_ITEMS';
export function filterItems(query) {
  return {
    type: FILTER_ITEMS,
    filterQuery: query
  };
}

export const END_ROUND = 'END_ROUND';
export function endRound() {
  return window.confirm('Sure?') ? {type: END_ROUND } : {type: 'DEVNULL'};
}

function fetchClubs() {
  return dispatch => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestClubs());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://golfstats.fransman.se/clubs.json`)
      .then(response => response.json())
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveClubs(json))
      );

      // In a real world app, you also want to
      // catch any error in the network call.
  };
}

function shouldFetchClubs(state) {
  const clubs = state.clubs.get('clubs').size;
  if (clubs === 0) {
    return true;
  } else if (state.clubs.get('loading')) {
    return false;
  }
}


export function fetchClubsIfNeeded() {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchClubs(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchClubs());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}
