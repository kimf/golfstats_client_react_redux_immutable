import { fromJS, List as iList } from 'immutable';
import { keysIn } from 'lodash';

const initialState = fromJS({ loading: false, slope: false, course: false, club: false,
                              holes: [], currentHole: 0, shots: {} });

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
    const firstShots = {};
    action.holes.map((hole) => { firstShots[hole.id] = [{lie: 'TEE', finished: false}]; });
    return state.merge({holes: fromJS(action.holes), loading: false, shots: firstShots});

  case 'CHANGE_HOLE':
    return state.merge({currentHole: action.index});

  case 'SET_SHOT_DATA':
    const shot = fromJS(action.shot);

    const searchPath = ['shots', '' + action.holeId + ''];
    const shotList = state.getIn(searchPath);

    if ( shotList === undefined ) {
      return state.setIn(searchPath, iList.of(shot));
    } else {
      // TODO - this seems pretty wrong!
      const oldShot = shotList.get(action.shotIndex);
      let newShot = oldShot.merge(shot);

      let finished = false;
      // All regular properties are there
      const requiredKeys = ['success', 'lie', 'club', 'goingFor', 'endLie'];
      const foundKeys = keysIn(newShot.toJS());
      if ( requiredKeys.every(key => foundKeys.indexOf(key) !== -1) ) {
        finished = true;

        // Special rules apply for Approach shot
        if (newShot.get('goingFor') === 'GREEN') {
          finished = newShot.get('distanceFromHole') !== undefined;
        }
        // Special rule for putt
        if (newShot.get('goingFor') === 'HOLE') {
          finished = newShot.get('distance') !== undefined;
        }
        // Special rules also apply for Misses
        if (newShot.get('success') === false && !newShot.get('putt')) {
          finished = newShot.get('missPosition') !== undefined;
        }
      }

      newShot = newShot.set('finished', finished);
      let newShotList = shotList.set(action.shotIndex, newShot);

      if ( newShot.get('finished') && newShot.get('endLie') !== 'IN THE HOLE') {
        newShotList = newShotList.set(action.shotIndex + 1, fromJS({lie: newShot.get('endLie')}));
      }
      return state.setIn(searchPath, newShotList);
    }
    break;

  case 'REMOVE_SHOT':
    const path = ['shots', '' + action.holeId + ''];
    const shots = state.getIn(path);
    return state.setIn(path, shots.delete(action.index));

  case 'END_ROUND':
    return initialState;

  default:
    return state;
  }
}
