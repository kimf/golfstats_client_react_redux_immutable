import fetch from 'isomorphic-fetch';

export const REQUEST_CLUBS = 'REQUEST_CLUBS';
function requestClubs() {
  return {
    type: REQUEST_CLUBS
  };
}

export const RECEIVE_CLUBS = 'RECEIVE_CLUBS';
function receiveClubs(json) {
  return {
    type: RECEIVE_CLUBS,
    clubs: json.clubs,
    receivedAt: Date.now()
  };
}

export const SELECT_WITH_ID = 'SELECT_WITH_ID';
export function selectWithId(model, id) {
  return {
    type: SELECT_WITH_ID,
    model: model,
    id: id
  };
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

    return fetch(`http://localhost:9292/clubs.json`)
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
  const clubs = state.clubs;
  if (clubs.length === 0) {
    return true;
  } else if (state.loading) {
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
