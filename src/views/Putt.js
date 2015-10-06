import React, {Component, PropTypes} from 'react';

export default class Putt extends Component {
  static propTypes = {
    setShotData: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  addResult (result) {
    let endLie = null;

    if (result === 'OFF THE GREEN') {
      endLie = null;
    } else if (result === 'IN THE HOLE') {
      endLie = 'IN THE HOLE';
    } else {
      endLie = 'GREEN';
    }
    this.props.setShotData( { result, endLie } );
  }

  addDistance() {
    this.props.setShotData( { distance: 2 } );
  }

  renderResults(result, index) {
    return <button key={index} className="bigass" onClick={this.addResult.bind(this, result)}>{result}</button>;
  }

  render() {
    const results = ['IN THE HOLE', 'SHORT', 'LONG', 'LEFT', 'RIGHT', 'OFF THE GREEN'];
    const result = this.state.result;
    const distance = this.state.distance;


    if (!result) {
      return (
        <div className="teeshot">
          <h6>WHERE DID YOU PUTT IT?</h6>
          { results.map(this.renderResults.bind(this)) }
        </div>
      );
    }

    if (!distance) {
      return (
        <div className="teeshot">
          <h6>WHAT WAS THE DISTANCE TO THE FLAG?</h6>
          <button className="bigass" onClick={this.addDistance.bind(this)}>2m</button>
        </div>
      );
    }

    return <div>Saving...</div>;
  }
}
