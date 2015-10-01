import React, { Component, PropTypes } from 'react';

export default class GridItem extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string
  }

  render() {
    return (
      <li className="grid" onClick={this.props.onClick}>
        <strong>{this.props.title}</strong>
        <small>{this.props.subTitle}</small>
      </li>
    );
  }
}
