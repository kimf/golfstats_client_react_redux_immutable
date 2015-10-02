import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchClubsIfNeeded } from 'actions/clubs';

import ClubList from 'views/ClubList';
import CourseList from 'views/CourseList';
import SlopeList from 'views/SlopeList';
import FinalizeSetupView from 'views/FinalizeSetupView';

const mapStateToProps = (state) => ({
  filterQuery: state.clubs.get('filterQuery'),
  clubs: state.clubs.get('clubs').toJS(),
  club: state.play.get('club'),
  course: state.play.get('course'),
  slope: state.play.get('slope')
  // courseId: state.play.get('clubId'),
  // slopeId: state.play.get('slopeId')
});

export class SetupRoundView extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired,
    clubs: PropTypes.array.isRequired,
    club: PropTypes.object,
    course: PropTypes.object,
    slope: PropTypes.object,
    filterQuery: PropTypes.string.isRequired
  }

  constructor () {
    super();
  }

  componentDidMount () {
    this.props.dispatch( fetchClubsIfNeeded() );
  }

  // _increment () {
  //   this.props.dispatch({ type : 'COUNTER_INCREMENT' });
  // }

  // <button className='btn btn-default'
  //         onClick={::this._increment}>

  render () {
    const { club, clubs, course, slope, dispatch, filterQuery } = this.props;
    let content = '';

    // SLOPE NEEDS TO HAVE INT(HOLES) ON IT SO I CAN DO "SELECT STARTING HOLE" SELECT ON FINALIZESETUPVIEW.
    // THAT VIEW WILL ALSO BE USED TO SETUP GAME FORMAT AND OTHER STUFF, FOR EXAMPLE PLAYERS, AND OTHER META DATA FOR STATISTICS
    // IT SHOULD NOT LOAD HOLES. THAT WILL BE RESPONSIBILITY OF ROUNDVIEW!

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

export default connect(mapStateToProps)(SetupRoundView);
