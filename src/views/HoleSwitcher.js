import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class HoleSwitcher extends Component {
  static propTypes = {
    maxIndex: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {maxIndex, currentIndex} = this.props;

    let next = '';
    let prev = '';

    if ( currentIndex < maxIndex) {
      next = <Link className="btn back" to={`/play/${currentIndex + 1}`}>NEXT HOLE &rarr;</Link>;
    }

    if ( currentIndex > 0) {
      prev = <Link className="btn next" to={`/play/${currentIndex - 1}`}>&larr; PREV HOLE</Link>;
    }

    return (
      <ul>
        {prev}
        {next}
      </ul>
    );
  }
}
