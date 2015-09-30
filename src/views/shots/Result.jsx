import React from 'react'
import _ from 'lodash'

export default class Result extends React.Component {

  constructor(props) {
    super(props);
    if(props.par == 3){
      this.results = ['HIT GREEN', 'MISS GREEN', 'IN THE HOLE', 'PENALTY']
    } else {
      this.results = ['HIT FAIRWAY', 'MISS FAIRWAY', 'HIT GREEN', 'MISS GREEN', 'IN THE HOLE', 'PENALTY']
    }
    this.state = {}
  }


  render() {
    return(
      <div className="teeshot">
        <h6>WHAT WAS THE RESULT?</h6>
        { this.results.map((result, index) =>
          <button className="bigass" key={index} onClick={e => this.props.addResult(result)}>{result}</button>
        )}
      </div>

    )
  }
}
