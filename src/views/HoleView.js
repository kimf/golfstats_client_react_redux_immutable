import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

import ShotItem from 'views/ShotItem';

import { removeShot, setShotData } from 'actions/play';

export default class HoleView extends Component {
  static propTypes = {
    dispatch  : PropTypes.func.isRequired,
    hole      : PropTypes.object.isRequired,
    shots     : PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  setShotData (shot, index) {
    const hole = this.props.hole;
    this.props.dispatch( setShotData(shot, hole.id, index) );
  }

  removeShot (index) {
    this.props.dispatch( removeShot(index) );
  }

  render () {
    const { hole } = this.props;
    let shots = this.props.shots;

    if (shots.length === 0) {
      shots = [{}];
    }

    return (
      <div>
        <header>
          <h1>Hole {hole.hole.number} <small>{hole.length}m</small> <small>Par: {hole.hole.par}</small></h1>
        </header>
        <div className="content">
          <ul>
             {shots.map((t, index) =>
               <ShotItem
                 shot={t}
                 par={hole.hole.par}
                 key={index}
                 index={index}
                 onSetData={::this.setShotData}
                 onRemove={() => ::this.removeShot(index)} />
             )}
           </ul>
        </div>
      </div>
    );
  }
}
