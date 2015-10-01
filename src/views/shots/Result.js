import React, { Component, PropTypes } from 'react';
import { GREEN_RESULTS, FAIRWAY_RESULTS } from 'constants';

export default class Result extends Component {
  static propTypes = {
    par: PropTypes.number.isRequired,
    addResult: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render () {
    const { par, addResult } = this.props;
    const results = par === 3 ? GREEN_RESULTS : FAIRWAY_RESULTS;
    return (
      <div className="teeshot">
        <h2>WHAT WAS THE RESULT?</h2>
        { results.map((result, index) =>
          <button className="bigass" key={index} onClick={() => addResult(result)}>{result}</button>
        )}
      </div>
    );
  }
}
