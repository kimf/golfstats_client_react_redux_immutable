import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  render() {
    return (
      <li onClick={this.props.onClick}>
        {this.props.title}
      </li>
    );
  }
}

ListItem.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired
};
