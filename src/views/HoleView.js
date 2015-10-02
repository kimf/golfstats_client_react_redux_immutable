import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import { last } from 'lodash';

import ShotItem from 'views/ShotItem';
import Putt from 'views/Putt';
import Shot from 'views/Shot';

import { addShot, removeShot } from 'actions';

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

  addShot (shot) {
    const hole = this.props.hole;
    this.props.dispatch( addShot(shot, hole.id) );
  }

  render () {
    const { hole, shots } = this.props;
    const lastShot = last(shots);
    const lie = lastShot ? lastShot.endLie : 'TEE';
    let shotButton = '';

    if (lie === 'IN THE HOLE') {
      shotButton = false;
    } else if (lie === 'GREEN') {
      shotButton = <Putt addPutt={::this.addShot} />;
    } else {
      shotButton = <Shot lie={lie} par={hole.hole.par} length={hole.length} addShot={::this.addShot} />;
    }


    return (
      <div>
        <header>
          <h1>Hole {hole.hole.number} <small>{hole.length}m</small> <small>Par: {hole.hole.par}</small></h1>
          <a href="#" onClick={() => ::this.resetChoice()}>&larr; CHANGE TEE </a>;
        </header>
        <div className="content">
          <ul>
             {shots.map((t, index) =>
               <ShotItem
                 shot={t}
                 key={index}
                 onRemove={() => ::this.props.dispatch(removeShot(index))} />
             )}
           </ul>
           {shotButton}
        </div>
      </div>
    );
  }
}
