import React, { Component, PropTypes } from 'react';
import { deSelectItem } from 'actions/general';
import { times } from 'lodash';

import { Link } from 'react-router';

// import Loading from 'views/Loading';
// { (holes.length === 0) ? <Loading /> : ''}

export default class FinalizeSetupView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    club: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    slope: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.func
  }

  render() {
    const { club, course, slope } = this.props;

    return (
        <div>
          <header>
            <a href="#" onClick={() => ::this.props.dispatch(deSelectItem('slope'))}>&larr; CHANGE TEE </a>;
            <h1>Club: {club.name}</h1>
            <h2>Course: {course.name}</h2>
            <h3>Tee: {slope.name} ({slope.length}m)</h3>
            <h4>Slope: {slope.slope_value}/{slope.course_rating}</h4>
          </header>
          <div className="content">
            <h2>Select starting hole</h2>
            <ul>
              {times(slope.tee_count, (index) =>
                 <Link key={index} className="gridLink" to={`/play/${index}`}>{(index + 1).toString(10)}</Link>
              )}
            </ul>
          </div>
        </div>
    );
  }
}
