import { fromJS, List as iList } from 'immutable';

const initialState = fromJS({ loading: false, slope: false, course: false, club: false,
                              holes: [], currentHole: 0, shots: [] });

// // normally this would be imported from /constants, but in trying to keep
// // this starter kit as small as possible we'll just define it here.
// const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

// export default createReducer(initialState, {
//   [COUNTER_INCREMENT] : (state) => state + 1
// });

export default function play(state = initialState, action) {
  switch ( action.type ) {

  case 'SELECT_ITEM':
    return state.set(action.model, fromJS(action.item));

  case 'DE_SELECT_ITEM':
    return state.set(action.model, false);

  case 'REQUEST_HOLES':
    return state.set('loading', true);

  case 'RECEIVE_HOLES':
    return state.merge({holes: fromJS(action.holes), loading: false});

  case 'CHANGE_HOLE':
    return state.merge({currentHole: action.index});

  case 'SET_SHOT_DATA':
    // get  all shots for hole with id === holeId
    // merge the data for the shot in shots with index === shotIndex
    if ( state.get('shots').size === 0) {
      const shot = fromJS(action.shot).merge(fromJS({holeId: action.holeId}));
      return state.updateIn(['shots'], iList, list => list.push(shot));
    } else {
      const newShot = fromJS(action.shot).merge(shot)

      list = list.updateIn(['shots',]
        list.findIndex(function(item) {
          return item.get("name") === "third";
        }), function(item) {
          return item.merge(fromJS(action.shot));
        }
      );
    }
    break;

  case 'REMOVE_SHOT':
    return state.removeIn(['shots', action.index]);

  case 'END_ROUND':
    return initialState;

  default:
    return state;
  }
}


shots = [
  {holeId: }
]
