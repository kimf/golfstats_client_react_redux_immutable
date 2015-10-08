import React, { Component, PropTypes } from 'react';


export default class Distance extends Component {
  static propTypes = {
    addDistance: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render () {
    const { addDistance } = this.props;
    return (
      <div className="teeshot">
        <h2>WHAT WAS THE DISTANCE TO THE FLAG?</h2>
        <button className="bigass" onClick={() => addDistance(125)}>125m</button>
      </div>
    );
  }
}
