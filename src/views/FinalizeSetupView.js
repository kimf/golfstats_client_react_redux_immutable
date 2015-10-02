import React, { Component, PropTypes } from 'react';
import { selectItem, deSelectItem } from 'actions/general';

import GridItem from 'views/GridItem';
import Loading from 'views/Loading';

export default class FinalizeSetupView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    club: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    slope: PropTypes.object.isRequired
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
            { (loading || holes.length === 0) ? <Loading /> : ''}
            <ul>
             {holes.map((t, index) =>
               <GridItem
                 title={t.hole.number.toString(10)}
                 subTitle={'par ' + t.hole.par + '- (' + t.length + 'm)'}
                 key={index}
                 onClick={() => ::this.props.dispatch(selectItem('hole', index))} />
             )}
            </ul>
          </div>
        </div>
    );
  }
}
