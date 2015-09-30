import React from 'react'
import _ from 'lodash'

export default class Distance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return(
      <div className="teeshot">
        <h6>WHAT WAS THE DISTANCE TO THE FLAG?</h6>
        <button className="bigass" onClick={e => this.props.addDistance(125)}>125m</button>
      </div>
    )
  }
}
