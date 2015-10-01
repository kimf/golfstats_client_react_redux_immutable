import React, { Component, PropTypes } from 'react';

export default class Miss extends Component {
  static propTypes = {
    addMissPosition: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.misses = ['SHORT', 'LEFT', 'LONG', 'RIGHT', 'SHORT LEFT', 'SHORT RIGHT', 'LONG LEFT', 'LONG RIGHT'];
    this.state = {};
  }

  render () {
    const { addMissPosition }  = this.props;

    return (
      <div className="teeshot">
        <h6>WHERE DID YOU MISS IT?</h6>
        { this.misses.map((position, index) =>
          <button className="bigass" key={index} onClick={() => addMissPosition(position)}>{position}</button>
        )}
      </div>
    );
  }
}
