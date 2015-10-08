import React, { Component, PropTypes } from 'react';
import { endRound } from 'actions/play';
import ConfirmButton from 'views/ConfirmButton';

export default class ScorecardView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    holes: PropTypes.array.isRequired,
    shots: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="scorecard">
        <footer>
          <button className="btn" onClick={this.props.onClose}>FORTSÄTT SPELA</button>
          <ConfirmButton title="AVSLUTA RUNDA" question="For realz?" onConfirm={() => ::this.props.dispatch(endRound())} />
        </footer>
      </div>
    );
  }
}
