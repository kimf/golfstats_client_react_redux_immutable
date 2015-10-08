import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

import ShotInput from 'views/ShotInput';
import ShotListItem from 'views/ShotListItem';

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
    const holeId = this.props.hole.id;
    this.props.dispatch( setShotData(shot, holeId, index) );
  }

  removeShot (holeId, index) {
    this.props.dispatch( removeShot(holeId, index) );
  }

  render () {
    const { hole, shots } = this.props;

    return (
      <div className="holeview">
        <header>
          <h1>Hole {hole.hole.number} <small>{hole.length}m</small> <small>Par: {hole.hole.par}</small></h1>
        </header>
        <div className="content">
          <ul>
            {shots.map((shot, index) => {
              if (shot.finished) {
                return <ShotListItem shot={shot} par={hole.hole.par} key={index} onRemove={() => this.removeShot(hole.id, index)} />;
              } else {
                return (<ShotInput
                  shot={shot}
                  par={hole.hole.par}
                  key={index}
                  index={index}
                  onSetData={::this.setShotData} />
                );
              }
            })}
           </ul>
        </div>
      </div>
    );
  }
}
