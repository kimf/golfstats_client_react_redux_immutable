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

export function resumeRound() {
  const meta = { transition: () => ({ path: '/play'}) };
  return { type: 'RESUME_ROUND', meta };
}

export function setShotData(shot, holeId, shotIndex) {
  return { type: 'SET_SHOT_DATA', shot, holeId, shotIndex};
}

export function removeShot(index) {
  return { type: 'REMOVE_SHOT', index };
}

export function changeHole(index) {
  return { type: 'CHANGE_HOLE', index };
}
