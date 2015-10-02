import React from 'react';
import Listing from 'views/Listing';

export default class CourseList extends Listing {
  constructor(props) {
    super(props);
    this.itemType = 'course';
    this.title = 'What course?';
    this.back = <a href="#" onClick={() => ::this.resetChoice()}>&larr; CHANGE CLUB </a>;
  }
}
