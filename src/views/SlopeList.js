import React from 'react';
import Listing from 'views/Listing';

export default class SlopeList extends Listing {
  constructor(props) {
    super(props);
    this.itemType = 'slope';
    this.title = 'From what tee?';
    this.back = <a href="#" onClick={() => ::this.resetChoice()}>&larr; CHANGE COURSE </a>;
  }
}
