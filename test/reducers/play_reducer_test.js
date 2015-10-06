import expect from 'expect';
import { describe, it } from 'mocha';
import { fromJS } from 'immutable';

import {setShotData} from '../../src/actions/play';
import reducer from '../../src/reducers/play';

describe('actions', () => {
  it('should create an action to set shot data', () => {
    const shot = {};
    const holeId = 1;
    const shotIndex = 0;
    const expectedAction = { type: 'SET_SHOT_DATA', shot, holeId, shotIndex};
    expect(setShotData(shot, holeId, shotIndex)).toEqual(expectedAction);
  });
});


describe('setShotDataReducer', () => {
  it('adds the first shot like nothing else', () => {
    const initialState = fromJS({shots: {}});
    const nextState = reducer(initialState, {type: 'SET_SHOT_DATA', shot: {lie: 'TEE'}, index: 0, holeId: 20}).toJS();

    expect(nextState).toEqual(
      { shots: {20: [{lie: 'TEE'}] }}
    );
  });

  it('merge the shotdata to the correct shot', () => {
    const initialState = fromJS({
      shots: {
        0: [{lie: 'TEE', club: 'Driver'}],
        1: [{lie: 'TEE', club: 'Driver'}, {lie: 'FAIRWAY'}]
      }
    });
    const nextState = reducer(initialState, {type: 'SET_SHOT_DATA', shot: {club: '5i', outcome: 'GREEN'}, index: 1, holeId: 1}).toJS();

    expect(nextState).toEqual({
      shots:{
        0: [{lie: 'TEE', club: 'Driver'}],
        1: [{lie: 'TEE', club: 'Driver'}, {lie: 'FAIRWAY', club: '5i', outcome: 'GREEN'}],
      }
    });
  });
});


// Expected
// Map { "shots": List [ Map { "lie": "TEE", "holeId": 1 } ] } to equal
// Map { "shots": List [ Map { "holeId": 1, "lie": "TEE" } ] }
