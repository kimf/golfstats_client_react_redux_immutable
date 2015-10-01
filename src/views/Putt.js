import React, {Component, PropTypes} from 'react';

export default class Putt extends Component {
  static propTypes = {
    addPutt: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      distance: 0,
      endLie: 'GREEN'
    };
  }

  componentDidUpdate() {
    const putt = { putt: true, result: this.state.result, distance: this.state.distance, endLie: this.state.endLie };
    if (putt.distance && putt.result) {
      this.props.addPutt(putt);
      this.setState({ putt: true, result: false, distance: false });
    }
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
    this.setState( { result: result, endLie: endLie } );
  }

  addDistance() {
    window.console.log('adding distance');
    this.setState( { distance: 2 } );
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
