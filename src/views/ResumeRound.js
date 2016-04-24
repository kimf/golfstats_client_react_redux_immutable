import React, { Component, PropTypes } from 'react';
import { endRound, resumeRound } from 'actions/play';
import ConfirmButton from 'views/ConfirmButton';

export default class ResumeRound extends Component {
  static propTypes = {
    dispatch  : PropTypes.func.isRequired,
    club      : PropTypes.string.isRequired,
    course    : PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
  }

  end () {
    this.props.dispatch( endRound() );
  }

  resume () {
    this.props.dispatch( resumeRound() );
  }

  render () {
    const { course, club } = this.props;
    return (
      <div className="wrapper">
        <header>
          <h4><small>You have an active round at</small> <br /> {club} - {course}</h4>
        </header>
        <div className="content">
          <button className="btn success" onClick={::this.resume}>RESUME ROUND</button>
          <ConfirmButton title="AVSLUTA RUNDA" question="For realz?" onConfirm={::this.end} />
        </div>
      </div>
    );
  }
}
