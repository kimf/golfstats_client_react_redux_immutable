import React, { Component, PropTypes } from 'react';


export default class Distance extends Component {
  static propTypes = {
    addDistance: PropTypes.func.isRequired
  }


  constructor(props) {
    super(props);
    this.state = {};
  }


  render () {
    const { addDistance } = this.props;
    return (
      <div className="teeshot">
        <h6>WHAT WAS THE DISTANCE TO THE FLAG?</h6>
        <button className="bigass" onClick={() => addDistance(125)}>125m</button>
      </div>
    );
  }
}
