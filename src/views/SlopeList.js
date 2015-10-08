import React from 'react';
import Listing from 'views/Listing';

export default class SlopeList extends Listing {
  constructor(props) {
    super(props);
    this.itemType = 'slope';
    this.title = 'From what tee?';
    this.back = <a className="goback btn block" href="#" onClick={() => ::this.resetChoice('course')}>&larr; CHANGE COURSE </a>;
  }
}
