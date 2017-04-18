import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchClubsIfNeeded } from 'actions/clubs'

import ClubList from 'views/ClubList'
import CourseList from 'views/CourseList'
import SlopeList from 'views/SlopeList'
import ResumeRound from 'views/ResumeRound'
import Loading from 'views/Loading'

const boolOrObject = PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired

const mapStateToProps = (state) => ({
  ...state.clubs,
  club: state.play.club,
  course: state.play.course,
  slope: state.play.slope,
  rehydrated: state.appReducer.rehydrated
})

class SetupRoundContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    clubs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    club: boolOrObject,
    course: boolOrObject,
    slope: boolOrObject,
    filterQuery: PropTypes.string.isRequired,
    rehydrated: PropTypes.bool.isRequired
  }

  static defaultProps = {
    club: false,
    course: false,
    slope: false
  }

  componentDidMount() {
    this.props.dispatch(fetchClubsIfNeeded())
  }

  render() {
    const { club, clubs, course, slope, dispatch, filterQuery, rehydrated } = this.props

    let content = ''
    if (!rehydrated) {
      content = <Loading />
    } else if (slope) {
      content = <ResumeRound course={course.name} club={club.name} dispatch={dispatch} />
    } else if (course) {
      content = <SlopeList items={course.slopes} dispatch={dispatch} filterQuery={filterQuery} />
    } else if (club) {
      content = <CourseList items={club.courses} dispatch={dispatch} filterQuery={filterQuery} />
    } else {
      content = <ClubList items={clubs} dispatch={dispatch} filterQuery={filterQuery} />
    }

    return (
      <div>
        <header className="globalheader">GOLFTRACR</header>
        {content}
      </div>
    )
  }
}

export default connect(mapStateToProps)(SetupRoundContainer)
