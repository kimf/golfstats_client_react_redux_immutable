import React, { Component, PropTypes } from 'react'
import ListItem from 'views/ListItem'
import { selectItem, deSelectItem, filterItems } from 'actions/general'

export default class Listing extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    filterQuery: PropTypes.string
  }

  static defaultProps = {
    filterQuery: ''
  }

  constructor() {
    super()
    this.title = ''
    this.itemType = ''
    this.filterField = false
    this.back = false
  }

  resetChoice = (itemType) => {
    this.props.dispatch(deSelectItem(itemType))
  }

  selectItem = (item) => {
    this.props.dispatch(selectItem(this.itemType, item))
  }

  filterItems = (event) => {
    this.props.dispatch(filterItems(event.target.value))
  }


  render() {
    let items = this.props.items.sort((a, b) => a.name - b.name)
    const filterQuery = this.props.filterQuery

    if (filterQuery !== '') {
      items = items.filter(it => {
        const item = it.name.trim().toLowerCase()
        return item.indexOf(filterQuery) !== -1
      })
    }

    return (
      <div className="wrapper">
        <header className={this.filterField ? 'searching' : ''}>
          <h2>{this.title}</h2>
          {this.filterField ? <input type="text" value={filterQuery} onChange={this.filterItems} /> : ''}
        </header>
        <section className={this.filterField ? 'searching content' : 'content'}>
          {this.back ? this.back : ''}
          <ul>
            {items.map((item) =>
              <ListItem
                title={item.name}
                onClick={() => this.selectItem(item)}
                key={item.id}
              />
            )}
          </ul>
        </section>
      </div>
    )
  }
}
