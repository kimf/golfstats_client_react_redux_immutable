import React, { Component, PropTypes } from 'react';
import ListItem from 'views/ListItem';
import { selectItem, deSelectItem } from 'actions/general';
import { filter, trim } from 'lodash';

export default class Listing extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    filterQuery: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.title = '';
    this.itemType = '';
    this.filterField = false;
    this.back = false;
  }

  resetChoice (itemType) {
    this.props.dispatch( deSelectItem(itemType) );
  }

  selectItem (item) {
    this.props.dispatch( selectItem(this.itemType, item) );
  }


  render () {
    let items = this.props.items;
    const filterQuery = this.props.filterQuery;

    if ( filterQuery !== '' ) {
      items = filter(items, (it) => {
        const item = trim(it.name).toLowerCase();
        return item.indexOf(filterQuery) !== -1;
      });
    }

    return (
      <div>
        <header>
          {this.back ? this.back : ''}
          <h1>{this.title}</h1>
          {this.filterField ? this.filterField : ''}
        </header>
        <section className="content">
          <ul>
            {items.map((item) =>
              <ListItem title={item.name}
                        onClick={() => ::this.selectItem(item)}
                        key={item.id} />
            )}
           </ul>
        </section>
      </div>
    );
  }
}
