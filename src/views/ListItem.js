import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <li onClick={this.props.onClick}>
        {this.props.title}
      </li>
    );
  }
}
