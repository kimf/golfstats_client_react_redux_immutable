import React, { PropTypes } from 'react'
import { endRound } from 'actions/play'
import ConfirmButton from 'views/ConfirmButton'

const ScorecardView = ({ onClose, dispatch }) => (
  <div className="scorecard">
    <footer>
      <button className="btn" onClick={onClose}>FORTSÄTT SPELA</button>
      <ConfirmButton title="AVSLUTA RUNDA" question="For realz?" onConfirm={() => dispatch(endRound())} />
    </footer>
  </div>
)
ScorecardView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ScorecardView
