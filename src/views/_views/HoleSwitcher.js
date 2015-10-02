import React, { Component, PropTypes } from 'react';

export default class HoleSwitcher extends Component {
  static propTypes = {
    maxIndex: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {maxIndex, currentIndex, onNext, onPrev } = this.props;

    let next = '';
    let prev = '';

    if ( currentIndex < maxIndex) {
      next = <button onClick={onNext}>NEXT HOLE &rarr;</button>;
    }

    if ( currentIndex > 0) {
      prev = <button onClick={onPrev}>&larr; PREV HOLE</button>;
    }

    return (
      <ul>
        {prev}
        {next}
      </ul>
    );
  }
}
