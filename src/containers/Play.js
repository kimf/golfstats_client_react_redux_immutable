import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import { find } from 'lodash';

import Loading from 'views/Loading';
// import ListItem from 'views/ListItem';
import GridItem from 'views/GridItem';
import HoleView from 'views/HoleView';
import HoleSwitcher from 'views/HoleSwitcher';
import ConfirmButton from 'views/ConfirmButton';

import { endRound } from '../actions';
import { fetchHolesIfNeeded, selectHole } from '../hole_actions';


@connect(state => ({
  loading: state.holes.get('loading'),
  clubs: state.clubs.get('clubs').toJS(),
  courses: state.clubs.get('courses').toJS(),
  slopes: state.clubs.get('slopes').toJS(),
  holes: state.holes.get('holes').toJS(),
  hole: state.holes.get('hole'),
  shots: state.play.get('shots').toJS(),
  courseId: state.play.get('courseId'),
  clubId: state.play.get('clubId'),
  slopeId: state.play.get('slopeId')
}))

export default class Play extends Component {
  static propTypes = {
    dispatch   : PropTypes.func.isRequired,
    slopes     : PropTypes.array.isRequired,
    clubs      : PropTypes.array.isRequired,
    courses    : PropTypes.array.isRequired,
    dispatch   : PropTypes.func.isRequired,
    loading    : PropTypes.bool.isRequired,
    holes      : PropTypes.array.isRequired,
    shots      : PropTypes.array.isRequired,
    courseId   : PropTypes.number.isRequired,
    clubId     : PropTypes.number.isRequired,
    slopeId    : PropTypes.number.isRequired,
    hole       : PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]).isRequired
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch( fetchHolesIfNeeded(this.props.slopeId) );
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  endRound () {
    this.props.dispatch(endRound());
  }

  render () {
    const { dispatch, loading, slopes, clubs, courses, slopeId, clubId, courseId, holes, hole, shots } = this.props;
    let contentDiv = '';

    const club = find(clubs, {id: clubId});
    const course = find(courses, {id: courseId});
    const tee = find(slopes, {id: slopeId});

    if ( typeof(hole) === 'number' ) {
      contentDiv = (
        <div>
          <HoleView hole={holes[hole]} shots={shots} dispatch={dispatch}/>
          <footer className="subheader">
            <HoleSwitcher
              maxIndex={holes.length - 1}
              currentIndex={hole}
              onNext={() => ::this.props.dispatch( selectHole(hole + 1) )}
              onPrev={() => ::this.props.dispatch( selectHole(hole - 1) )} />
          </footer>
        </div>
      );
    } else {
      contentDiv = (
        <div>
          <header>
            <h1>Club: {club.name}</h1>
            <h2>Course: {course.name}</h2>
            <h3>Tee: {tee.name} ({tee.length}m)</h3>
            <h4>Slope: {tee.slope_value}/{tee.course_rating}</h4>
          </header>
          <div className="content">
            <h2>Select starting hole</h2>
            { (loading || holes.length === 0) ? <Loading /> : ''}
            <ul>
             {holes.map((t, index) =>
               <GridItem
                 title={t.hole.number.toString(10)}
                 subTitle={'par ' + t.hole.par + '- (' + t.length + 'm)'}
                 key={index}
                 onClick={() => ::this.props.dispatch(selectHole(index))} />
             )}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div>
        { contentDiv }
        <footer>
          <ConfirmButton title="AVSLUTA RUNDA" question="For realz?" onConfirm={() => ::this.endRound()} />
        </footer>
      </div>
    );
  }
}
