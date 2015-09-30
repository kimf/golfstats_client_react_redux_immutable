import React from 'react'
import _ from 'lodash'

export default class Miss extends React.Component {

  constructor(props) {
    super(props);
    this.misses = ['SHORT', 'LEFT', 'LONG', 'RIGHT', 'SHORT LEFT', 'SHORT RIGHT', 'LONG LEFT', 'LONG RIGHT']
    this.state = {}
  }


  render() {
    return(
      <div className="teeshot">
        <h6>WHERE DID YOU MISS IT?</h6>
        { this.misses.map((position, index) =>
          <button className="bigass" key={index} onClick={e => this.props.addMissPosition(position)}>{position}</button>
        )}
      </div>
    )
  }
}
