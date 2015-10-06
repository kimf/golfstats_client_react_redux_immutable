import React, {Component, PropTypes} from 'react';
import { PUTT_RESULTS } from 'constants';

export default class Putt extends Component {
  static propTypes = {
    putt: PropTypes.object.isRequired,
    setShotData: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.putt_results = PUTT_RESULTS;
  }

  addResult (result) {
    let endLie = null;
    let success = false;
    const club = 'PUTTER';
    const goingFor = 'HOLE';

    if (result === 'OFF THE GREEN') {
      endLie = null;
    } else if (result === 'IN THE HOLE') {
      success = true;
      endLie = 'IN THE HOLE';
    } else {
      endLie = 'GREEN';
    }
    this.props.setShotData( { putt: true, result, endLie, success, club, goingFor } );
  }

  addDistance() {
    this.props.setShotData( { putt: true, distance: 2 } );
  }

  renderResults(result, index) {
    return <button key={index} className="bigass" onClick={this.addResult.bind(this, result)}>{result}</button>;
  }

  render() {
    const { putt } = this.props;


    if (!putt.result) {
      return (
        <div className="putt">
          <h6>WHERE DID YOU PUTT IT?</h6>
          { this.putt_results.map(this.renderResults.bind(this)) }
        </div>
      );
    }

    if (!putt.distance) {
      return (
        <div className="putt">
          <h6>WHAT WAS THE DISTANCE TO THE FLAG?</h6>
          <button className="bigass" onClick={::this.addDistance}>2m</button>
        </div>
      );
    }

    return <div>Saving putt...</div>;
  }
}
