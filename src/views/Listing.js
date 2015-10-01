import React, { Component, PropTypes } from 'react';
import ListItem from 'views/ListItem';

export default class Listing extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    itemType: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
    selectItem: PropTypes.func.isRequired,
    filterField: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired
  }

  constructor(props) {
    super(props);
  }


  render () {
    const { title, items, itemType, selectItem, back, filterField} = this.props;

    return (
      <div>
        <header>
          <span className="back">{ back }</span>
          <h1>{title}</h1>
          {filterField}
        </header>
        <section className="content">
          <ul>
            {items.map((item) =>
              <ListItem title={item.name}
                        onClick={() => selectItem(itemType, item.id)}
                        key={item.id} />
            )}
           </ul>
        </section>
      </div>
    );
  }
}
