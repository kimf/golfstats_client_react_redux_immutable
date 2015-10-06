import React, { Component, PropTypes } from 'react';

export default class HoleSwitcher extends Component {
  static propTypes = {
    maxIndex: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    changeHole: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {maxIndex, currentIndex, changeHole} = this.props;

    let next = '';
    let prev = '';

    if ( currentIndex < maxIndex) {
      next = <button className="btn back" onClick={() => changeHole(currentIndex + 1)}>NEXT HOLE &rarr;</button>;
    }

    if ( currentIndex > 0) {
      prev = <button className="btn next" onClick={() => changeHole(currentIndex - 1)}>&larr; PREV HOLE</button>;
    }

    return (
      <ul>
        {prev}
        {next}
      </ul>
    );
  }
}
