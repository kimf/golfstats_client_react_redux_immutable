import React, { Component, PropTypes } from 'react';
import CourseListItem from './CourseListItem';


export default class SetupView extends Component {
  static propTypes = {
    selectCourse : React.PropTypes.func,
    club   : React.PropTypes.object
  }

  constructor () {
    super();
  }

  render () {
    const { club } = this.props;

    return (
      <div className='container text-center'>
        <h1>{club.name}</h1>

        <ul>
           {club.courses.map((course, index) =>
             <CourseListItem {...course}
                   key={index}
                   onClick={() => ::this.props.selectCourse(course.id)} />
           )}
         </ul>
      </div>
    );
  }
}

SetupView.propTypes = {
  club: PropTypes.object.isRequired
};
