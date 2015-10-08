import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchClubsIfNeeded } from 'actions/clubs';

import ClubList from 'views/ClubList';
import CourseList from 'views/CourseList';
import SlopeList from 'views/SlopeList';
import ResumeRound from 'views/ResumeRound';

const boolOrObject = PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired;

const mapStateToProps = (state) => ({
  filterQuery: state.clubs.get('filterQuery'),
  clubs: state.clubs.get('clubs').toJS(),
  club: state.play.get('club'),
  course: state.play.get('course'),
  slope: state.play.get('slope')
});

export class SetupRoundContainer extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired,
    clubs: PropTypes.array.isRequired,
    club: boolOrObject,
    course: boolOrObject,
    slope: boolOrObject,
    filterQuery: PropTypes.string.isRequired
  }

  constructor () {
    super();
  }

  componentDidMount () {
    this.props.dispatch( fetchClubsIfNeeded() );
  }

  render () {
    const { club, clubs, course, slope, dispatch, filterQuery } = this.props;

    let content = '';
    if ( slope ) {
      content = <ResumeRound course={course.toJS().name} club={club.toJS().name} dispatch={dispatch} />;
    } else if ( course ) {
      content = <SlopeList items={course.get('slopes').toJS()} dispatch={dispatch} filterQuery={filterQuery} />;
    } else if ( club ) {
      content = <CourseList items={club.get('courses').toJS()} dispatch={dispatch} filterQuery={filterQuery} />;
    } else {
      content = <ClubList items={clubs} dispatch={dispatch} filterQuery={filterQuery} />;
    }

    return (
      <div>
        <header className="globalheader">GOLFTRACR</header>
        { content }
      </div>
    );
  }
}

export default connect(mapStateToProps)(SetupRoundContainer);
