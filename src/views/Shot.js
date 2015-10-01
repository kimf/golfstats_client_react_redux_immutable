import React, { Component, PropTypes } from 'react';

import Result from 'views/shots/Result';
import Club from 'views/shots/Club';
import Lie from 'views/shots/Lie';
import Miss from 'views/shots/Miss';
import Distance from 'views/shots/Distance';

import { includes } from 'lodash';

export default class Shot extends Component {
  static propTypes = {
    par: PropTypes.number.isRequired,
    addShot: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      lie: props.lie,
      success: null,
      goingFor: null,
      club: null,
      distanceFromHole: null,
      proximityToHole: null,
      missPosition: null,
      endLie: null
    };
  }

  componentDidUpdate() {
    if (this.finished() ) {
      const state = this.state;
      this.state = {
        lie: state.endLie,
        success: null,
        goingFor: null,
        club: null,
        distanceFromHole: null,
        proximityToHole: null,
        missPosition: null,
        endLie: null
      };
      this.props.addShot(state);
    }
  }

  addClub(club) {
    this.setState({ club: club });
  }

  addResult(result) {
    let goingFor = 'FAIRWAY';
    let success = false;
    let endLie = null;

    if (includes(['HIT GREEN', 'MISS GREEN', 'IN THE HOLE'], result)) {
      goingFor = 'GREEN';
    }
    if (includes(['HIT GREEN', 'HIT FAIRWAY', 'IN THE HOLE'], result)) {
      success = true;
    }

    if (result === 'HIT FAIRWAY') {
      endLie = 'FAIRWAY';
    }

    if (result === 'HIT GREEN') {
      endLie = 'GREEN';
    }

    if (result === 'IN THE HOLE') {
      endLie = 'IN THE HOLE';
    }

    this.setState({
      goingFor: goingFor,
      success: success,
      endLie: endLie
    });
  }

  addDistance(distanceFromHole) {
    this.setState({ distanceFromHole: distanceFromHole });
  }

  addLie(lie) {
    this.setState( { lie: lie } );
  }

  addEndLie(endLie) {
    this.setState( { endLie: endLie } );
  }

  addMissPosition(missPosition) {
    this.setState({ missPosition: missPosition });
  }

  // TODO: REFACTOR
  finished() {
    let done = false;
    const state = this.state;

    // All regular properties are there
    if (state.success !== null && state.lie !== null && state.club !== null && state.goingFor !== null && state.endLie !== null) {
      done = true;

      // Special rules apply for Approach shot
      if (state.goingFor === 'GREEN') {
        done = state.distanceFromHole !== null;
      }

      // Special rules also apply for Misses
      if (state.success === false) {
        done = state.missPosition !== null;
      }
    }

    return done;
  }

  render () {
    if (!this.state.lie) {
      return <Lie addLie={this.addLie.bind(this)} />;
    }

    if (!this.state.club) {
      return <Club lie={this.state.lie} addClub={this.addClub.bind(this)} />;
    }

    if (this.state.success === null && this.state.goingFor === null) {
      return <Result par={this.props.par} addResult={this.addResult.bind(this)} />;
    }

    if (this.state.missPosition !== null && !this.state.endLie) {
      return <Lie addLie={this.addEndLie.bind(this)} />;
    }

    if (!this.state.success && this.state.missPosition === null) {
      return <Miss shot={this.state} addMissPosition={this.addMissPosition.bind(this)}/>;
    }

    if (this.state.goingFor === 'GREEN' && !this.state.distanceFromHole) {
      return <Distance shot={this.state} addDistance={this.addDistance.bind(this)}/>;
    }

    return <div>...</div>;
  }
}
