import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

import ListItem from 'views/ListItem';
import HoleView from 'views/HoleView';
import HoleSwitcher from 'views/HoleSwitcher';

import { fetchHolesIfNeeded, selectHole } from '../hole_actions';
import { endRound } from '../actions';

@connect(state => ({
  loading: state.holes.get('loading'),
  holes: state.holes.get('holes').toJS(),
  hole: state.holes.get('hole')
}))

export default class PlayRoot extends Component {
  static propTypes = {
    dispatch   : PropTypes.func.isRequired,
    loading    : PropTypes.bool.isRequired,
    holes      : PropTypes.array.isRequired,
    tee        : PropTypes.object.isRequired,
    course     : PropTypes.object.isRequired,
    club       : PropTypes.object.isRequired,
    hole       : PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]).isRequired
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch( fetchHolesIfNeeded(this.props.tee.id) );
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  render () {
    const { loading, holes, hole, tee, course, club } = this.props;
    let contentDiv = '';

    if (loading || holes.length === 0) {
      contentDiv = <div>LOADING HOLE DATA...</div>;
    } else if ( typeof(hole) === 'number' ) {
      contentDiv = (
        <div>
          <HoleSwitcher
            maxIndex={holes.length - 1}
            currentIndex={hole}
            onNext={() => ::this.props.dispatch(selectHole(hole + 1))}
            onPrev={() => ::this.props.dispatch(selectHole(hole - 1))} />
          <HoleView hole={holes[hole]} />
        </div>
      );
    } else {
      contentDiv = (
        <div>
          <h2>Select starting hole</h2>

          <ul>
           {holes.map((t, index) =>
             <ListItem
               title={t.hole.number + ' par ' + t.hole.par + '- (' + t.length + 'm)'}
               key={index}
               onClick={() => ::this.props.dispatch(selectHole(index))} />
           )}
          </ul>
        </div>
      );
    }

    return (
      <div className='content'>
        <h2>Club: {club.name}</h2>
        <h3>Course: {course.name}</h3>
        <h3>Tee: {tee.name}</h3>
        <hr />
        { contentDiv }
        <hr />
        <a href="#" onClick={() => ::this.props.dispatch(endRound())}>AVSLUTA RUNDA</a>
      </div>
    );
  }
}
