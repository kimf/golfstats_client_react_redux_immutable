import React, { Component, PropTypes } from 'react';

export default class CourseListItem extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}>
        {this.props.name}
      </li>
    );
  }
}

CourseListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};
