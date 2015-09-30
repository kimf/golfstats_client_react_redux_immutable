import { fromJS } from 'immutable';

const initialState = fromJS({activeNav: ''});

export default function navigation(state = initialState, action) {
  switch ( action.type ) {
  case 'GO_TO_VIEW':
    return state.set('activeNav', action.view);

  case 'END_ROUND':
    return initialState;

  default:
    return state;
  }
}
