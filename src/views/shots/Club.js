import React, { Component, PropTypes } from 'react';
import { CLUBS } from 'constants';

export default class Club extends Component {
  static propTypes = {
    lie     : PropTypes.string.isRequired,
    addClub : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.clubs = CLUBS;
  }

  render () {
    const { lie, addClub } = this.props;
    return (
      <div className="teeshot">
        <h2>WHAT CLUB DID YOU HIT FROM: <strong>{lie}</strong>?</h2>
        { this.clubs.map((club, index) =>
          <button className="bigass" key={index} onClick={() => addClub(club)}>{club}</button>
        )}
      </div>
    );
  }
}
