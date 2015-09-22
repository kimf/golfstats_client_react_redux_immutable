import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';


export default class CourseList extends Component {
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
             <ListItem
               title={course.name}
               key={index}
               onClick={() => ::this.props.selectCourse(course.id)} />
           )}
         </ul>
      </div>
    );
  }
}

CourseList.propTypes = {
  club: PropTypes.object.isRequired
};
