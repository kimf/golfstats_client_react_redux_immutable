import React from 'react';
import Listing from 'views/Listing';

export default class CourseList extends Listing {
  constructor(props) {
    super(props);
    this.itemType = 'course';
    this.title = 'What course?';
    this.back = <a className="goback btn block" href="#" onClick={() => ::this.resetChoice('club')}>&larr; CHANGE CLUB </a>;
  }
}
