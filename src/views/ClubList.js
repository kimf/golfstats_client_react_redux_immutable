import React from 'react';
import Listing from 'views/Listing';
import { filterItems } from 'actions/general';
import TextFilter from 'react-text-filter';

// import { fetchClubsIfNeeded } from 'actions/clubs';

export default class ClubList extends Listing {
  constructor(props) {
    super(props);
    this.itemType = 'club';
    this.title = 'Where are you playing today?';
    this.filterField = <TextFilter onFilter={(query) => ::this.filterItems({query})} />;
  }

  filterItems (filterQuery) {
    this.props.dispatch( filterItems(filterQuery) );
  }

  // componentDidMount () {
  //   this.props.dispatch( fetchClubsIfNeeded() );
  // }

}
