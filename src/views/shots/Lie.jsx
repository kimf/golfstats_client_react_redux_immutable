import React from 'react'
import _ from 'lodash'

export default class Lie extends React.Component {

  constructor(props) {
    super(props);
    this.lies = ['TEE', 'FAIRWAY', 'ROUGH', 'GREENSIDE ROUGH', 'FRINGE', 'FAIRWAY BUNKER', 'GREENSIDE BUNKER']
    this.state = {}
  }


  render() {
    return(
      <div className="teeshot">
        <h6>WHERE DID YOU HIT FROM?</h6>
        { this.lies.map((lie, index) =>
          <button className="bigass" key={index} onClick={e => this.props.addLie(lie)}>{lie}</button>
        )}
      </div>
    )
  }
}
