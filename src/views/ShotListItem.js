import React, { Component, PropTypes } from 'react';

export default class ShotListItem extends Component {
  static propTypes = {
    par: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    shot: PropTypes.object.isRequired
  }

  render () {
    const { lie, success, goingFor, club, distanceFromHole, proximityToHole, missPosition, endLie } = this.props.shot;
    return (
      <li className={success ? 'success' : 'fail'}>
        <strong>{club}</strong>
        { lie ? ('- lie' + lie) : ''}
        { goingFor ? ('- goingFor' + goingFor) : ''}
        { distanceFromHole ? ('- distanceFromHole' + distanceFromHole) : ''}
        { proximityToHole ? ('- proximityToHole' + proximityToHole) : ''}
        { missPosition ? ('- missPosition' + missPosition) : ''}
        <small className="badge">{endLie}</small>
        <button onClick={this.props.onRemove}>x</button>
      </li>
    );
  }
}
