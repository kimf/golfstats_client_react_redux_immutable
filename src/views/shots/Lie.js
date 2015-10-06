import React, { Component, PropTypes } from 'react';
import { LIES } from 'constants';

export default class Lie extends Component {
  static propTypes = {
    addLie: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.lies = LIES;
  }

  render () {
    const { addLie, title } = this.props;

    return (
      <div className="teeshot">
        <h2>{title}</h2>
        { this.lies.map((lie, index) =>
          <button className="bigass" key={index} onClick={() => addLie(lie)}>{lie}</button>
        )}
      </div>
    );
  }
}
