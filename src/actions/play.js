export function endRound() {
  return {
    type: 'END_ROUND',
    meta: {
      transition: () => ({
        path: '/'
      })
    }
  };
}

export function addShot(shot, holeId) {
  return { type: 'ADD_SHOT', shot, holeId };
}

export function removeShot(index) {
  return { type: 'REMOVE_SHOT', index };
}

export function changeHole(index) {
  return { type: 'CHANGE_HOLE', index };
}
