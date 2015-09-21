import React, { Component, PropTypes } from 'react';
import CourseListItem from 'views/CourseListItem';

export default class HomeView extends Component {
  static propTypes = {
    selectCourse : React.PropTypes.func,
    courses  : React.PropTypes.array
  }

  constructor () {
    super();
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Golfstats</h1>

        <ul>
           {this.props.courses.map((course, index) =>
             <CourseListItem {...course}
                   key={index}
                   onClick={() => ::this.props.selectCourse(course.id)} />
           )}
         </ul>
      </div>
    );
  }
}

HomeView.propTypes = {
  courses: PropTypes.array.isRequired
};
