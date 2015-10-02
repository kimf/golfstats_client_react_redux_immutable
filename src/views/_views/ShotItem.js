import React, { Component, PropTypes } from 'react';

export default class ShotItem extends Component {
  static propTypes = {
    onRemove: PropTypes.func,
    shot: PropTypes.object.isRequired
  }

  render() {
    const { onRemove, shot } = this.props;
    const { lie, success, goingFor, club, distanceFromHole, proximityToHole, missPosition, endLie } = shot;
    return (
      <li className={success ? 'success' : 'fail'}>
        <strong>{club}</strong>
        { lie ? ('- lie' + lie) : ''}
        { goingFor ? ('- goingFor' + goingFor) : ''}
        { distanceFromHole ? ('- distanceFromHole' + distanceFromHole) : ''}
        { proximityToHole ? ('- proximityToHole' + proximityToHole) : ''}
        { missPosition ? ('- missPosition' + missPosition) : ''}
        <small className="badge">{endLie}</small>
        <button onClick={onRemove}>x</button>
      </li>
    );
  }
}
