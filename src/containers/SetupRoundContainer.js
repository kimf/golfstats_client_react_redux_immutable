import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchClubsIfNeeded } from 'actions/clubs';

import ClubList from 'views/ClubList';
import CourseList from 'views/CourseList';
import SlopeList from 'views/SlopeList';
import FinalizeSetupView from 'views/FinalizeSetupView';

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
      content = <FinalizeSetupView slope={slope.toJS()} course={course} club={club} dispatch={dispatch} />;
    } else if ( course ) {
      content = <SlopeList items={course.get('slopes').toJS()} dispatch={dispatch} filterQuery={filterQuery} />;
    } else if ( club ) {
      content = <CourseList items={club.get('courses').toJS()} dispatch={dispatch} filterQuery={filterQuery} />;
    } else {
      content = <ClubList items={clubs} dispatch={dispatch} filterQuery={filterQuery} />;
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

export default connect(mapStateToProps)(SetupRoundContainer);
