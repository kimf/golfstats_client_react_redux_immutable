import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';


export default class TeeList extends Component {
  static propTypes = {
    selectTee : React.PropTypes.func,
    course   : React.PropTypes.object,
    club     : React.PropTypes.string
  }

  constructor () {
    super();
  }

  render () {
    const { course, club } = this.props;

    return (
      <div className='container text-center'>
        <h1>{club} - {course.name}</h1>

        <ul>
           {course.slopes.map((tee, index) =>
             <ListItem
               title={tee.name + ' - (' + tee.length + 'm)'}
               key={index}
               onClick={() => ::this.props.selectTee(tee.id)} />
           )}
         </ul>
      </div>
    );
  }
}

TeeList.propTypes = {
  course: PropTypes.object.isRequired,
  club: PropTypes.string.isRequired
};
