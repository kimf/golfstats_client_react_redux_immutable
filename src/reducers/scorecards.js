import { fromJS } from 'immutable';

const initialState = fromJS({loading: false, scorecards: {}, scorecard: {}});
// import { filter } from 'lodash';

export default function clubsReducer(state = initialState, action) {
  switch ( action.type ) {

  case 'REQUEST_SCORECARDS':
    return state.set('loading', true);

  case 'RECEIVE_SCORECARDS':
    const scores = action.scores.entities.scores;
    const scorecards = action.scorecards.entities.scorecards;
    return fromJS({
      loading: false,
      scores: scores,
      scorecards: scorecards,
      receivedAt: action.receivedAt
    });

  default:
    return state;
  }
}
