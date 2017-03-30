import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { endRound } from 'actions/play'
import ConfirmButton from 'views/ConfirmButton'

const ResumeRound = ({ dispatch, course, club }) => (
  <div className="wrapper">
    <header>
      <h4><small>You have an active round at</small> <br /> {club} - {course}</h4>
    </header>
    <div className="content">
      <Link to="/play" className="btn success">RESUME ROUND</Link>
      <ConfirmButton title="AVSLUTA RUNDA" question="For realz?" onConfirm={() => dispatch(endRound())} />
    </div>
  </div >
)

ResumeRound.propTypes = {
  dispatch: PropTypes.func.isRequired,
  club: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired
}

export default ResumeRound
