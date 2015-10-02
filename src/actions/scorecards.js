import fetch from 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';

const scorecard = new Schema('scorecards');
const score = new Schema('scores');

scorecard.define({
  scores: arrayOf(score)
});

score.define({
  scorecard: scorecard
});

export const REQUEST_SCORECARDS = 'REQUEST_SCORECARDS';
function requestScorecards() {
  return {
    type: REQUEST_SCORECARDS
  };
}

export const RECEIVE_SCORECARDS = 'RECEIVE_SCORECARDS';
function receiveScorecards(json) {
  const response = normalize(json, {
    scorecards: arrayOf(scorecard)
  });
  return {
    type: RECEIVE_SCORECARDS,
    scorecards: response,
    receivedAt: Date.now()
  };
}

export const SELECT_SCORECARD = 'SELECT_SCORECARD';
export function selectScorecard(id) {
  return {
    type: SELECT_SCORECARD,
    id: id
  };
}

function fetchScorecards() {
  return dispatch => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestScorecards());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    const API_URL = (process.env.NODE_ENV === 'development') ? 'http://workbook.local:9292' : 'http://golfstats.fransman.se';
    return fetch(API_URL +  '/scorecards.json')
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveScorecards(json))
      );

      // In a real world app, you also want to
      // catch any error in the network call.
  };
}

function shouldFetchScorecards(state) {
  const scorecards = state.scorecards.get('scorecards').size;
  if (scorecards === 0) {
    return true;
  } else if (state.scorecards.get('loading')) {
    return false;
  }
}


export function fetchScorecardsIfNeeded() {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchScorecards(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchScorecards());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}
