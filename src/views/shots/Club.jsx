import React, { Component } from 'react'

export default class Club extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    { clubs } = this.props;
    return(
      <div className="teeshot">
        <h6>WHAT CLUB DID YOU HIT FROM: <strong>{this.props.lie}</strong>?</h6>
        { clubs.map((club, index) =>
          <button className="bigass" key={index} onClick={e => this.props.addClub(club)}>{club}</button>
        )}
      </div>
    )
  }
}
