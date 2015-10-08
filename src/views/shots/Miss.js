import React, { Component, PropTypes } from 'react';
import { MISSES } from 'constants';

export default class Miss extends Component {
  static propTypes = {
    addMissPosition: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.misses = MISSES;
  }

  render () {
    const { addMissPosition } = this.props;

    return (
      <div className="teeshot">
        <h2>WHERE DID YOU MISS IT?</h2>
        { this.misses.map((position, index) =>
          <button className="bigass" key={index} onClick={() => addMissPosition(position)}>{position}</button>
        )}
      </div>
    );
  }
}
