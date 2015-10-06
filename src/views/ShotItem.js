import React, { Component, PropTypes } from 'react';

import Result from 'views/shots/Result';
import Club from 'views/shots/Club';
import Lie from 'views/shots/Lie';
import Miss from 'views/shots/Miss';
import Distance from 'views/shots/Distance';

import { includes, last } from 'lodash';

export default class ShotItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    par: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSetData: PropTypes.func.isRequired,
    shot: PropTypes.object.isRequired
  }

  setData (data) {
    const index = this.props.index;
    this.props.onSetData(data, index);
  }

  addClub(club) {
    this.setData({ club });
  }

  addResult(result) {
    let goingFor = 'FAIRWAY';
    let success = false;
    const endLie = last(result.split(''));

    if (includes(['HIT GREEN', 'MISS GREEN', 'IN THE HOLE'], result)) {
      goingFor = 'GREEN';
    }

    if (includes(['HIT GREEN', 'HIT FAIRWAY', 'IN THE HOLE'], result)) {
      success = true;
    }

    this.setData({ goingFor, success, endLie });
  }

  addDistance(distanceFromHole) {
    this.setData({ distanceFromHole });
  }

  addLie(lie) {
    this.setData({ lie });
  }

  addEndLie(endLie) {
    this.setData({ endLie });
  }

  addMissPosition(missPosition) {
    this.setData({ missPosition });
  }

  // TODO: REFACTOR
  finished (shot) {
    let done = false;

    // All regular properties are there
    if (shot.success && shot.lie && shot.club && shot.goingFor && shot.endLie) {
      done = true;

      // Special rules apply for Approach shot
      if (shot.goingFor === 'GREEN') {
        done = typeof(shot.distanceFromHole) !== 'undefined';
      }

      // Special rules also apply for Misses
      if (shot.success === false) {
        done = typeof(shot.missPosition) !== 'undefined';
      }
    }

    return done;
  }

  buildShot (shot ) {
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
        <button onClick={this.props.onRemove}>x</button>
      </li>
    );
  }


  render() {
    const { shot, par } = this.props;

    if (this.finished(shot)) {
      return this.buildShot(shot);
    } else {
      if (!shot.lie) {
        return <Lie addLie={::this.addLie} />;
      }

      if (!shot.club) {
        return <Club lie={shot.lie} addClub={::this.addClub} />;
      }

      if (shot.success === null && shot.goingFor === null) {
        return <Result par={par} addResult={::this.addResult} />;
      }

      if (shot.missPosition !== null && !shot.endLie) {
        return <Lie addLie={::this.addEndLie} />;
      }

      if (!shot.success && shot.missPosition === null) {
        return <Miss shot={shot} addMissPosition={::this.addMissPosition}/>;
      }

      if (shot.goingFor === 'GREEN' && !shot.distanceFromHole) {
        return <Distance shot={shot} addDistance={::this.addDistance}/>;
      }
    }
  }
}
