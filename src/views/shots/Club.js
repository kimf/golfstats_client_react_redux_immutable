import React, { Component, PropTypes } from 'react';

export default class Club extends Component {
  static propTypes = {
    lie     : PropTypes.string.isRequired,
    addClub : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.clubs = ['Driver', '3W', '3HY', '4', '5', '6', '7', '8', '9', 'PW', 'GW', 'SW', 'LW', 'PUTT'];
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
