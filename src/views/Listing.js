import React, { Component, PropTypes } from 'react';
import ListItem from 'views/ListItem';
import { selectItem, deSelectItem } from 'actions/general';
import { filter, trim, sortBy } from 'lodash';

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
    let items = sortBy(this.props.items, (item) => { return item.name; });
    const filterQuery = this.props.filterQuery;

    if ( filterQuery !== '' ) {
      items = filter(items, (it) => {
        const item = trim(it.name).toLowerCase();
        return item.indexOf(filterQuery) !== -1;
      });
    }

    return (
      <div className="wrapper">
        <header className={this.filterField ? 'searching' : ''}>
          <h2>{this.title}</h2>
          {this.filterField ? this.filterField : ''}
        </header>
        <section className={this.filterField ? 'searching content' : 'content'}>
          {this.back ? this.back : ''}
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
