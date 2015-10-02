export function endRound() {
  return {type: 'END_ROUND' };
}

export function addShot(shot, holeId) {
  return { type: 'ADD_SHOT', shot, holeId };
}

export function removeShot(index) {
  return { type: 'REMOVE_SHOT', index };
}
