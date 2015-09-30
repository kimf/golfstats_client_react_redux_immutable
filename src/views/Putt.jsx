import React, {Component} from 'react'

export default class Putt extends Component {

  constructor(props) {
    super(props);
  }

  addResult(result) {
    console.log('adding result')
    let end_lie = null

    if(result == 'OFF THE GREEN'){
      end_lie = null
    } else if(result == 'IN THE HOLE'){
      end_lie = 'IN THE HOLE'
    } else {
      end_lie = 'GREEN'
    }
    this.setState( { result: result, end_lie: end_lie } )
  }

  addDistance() {
    console.log('adding distance')
    this.setState( { distance: 2 } )
  }

  componentDidUpdate(prevProps, prevState) {
    let putt = { putt: true, result: this.state.result, distance: this.state.distance, end_lie: this.state.end_lie }
    if(putt.distance && putt.result) {
      this.props.addPutt(putt)
      this.setState({ putt: true, result: false, distance: false })
    }
  }

  renderResults(result, index) {
   return <button key={index} className="bigass" onClick={this.addResult.bind(this, result)}>{result}</button>
  }

  render() {
    let results = ['IN THE HOLE', 'SHORT', 'LONG', 'LEFT', 'RIGHT', 'OFF THE GREEN']

    let result = this.state.result
    let distance = this.state.distance


    if(!result){
      return(
        <div className="teeshot">
          <h6>WHERE DID YOU PUTT IT?</h6>
          { results.map(this.renderResults.bind(this)) }
        </div>
      )
    }

    if(!distance){
      return(
        <div className="teeshot">
          <h6>WHAT WAS THE DISTANCE TO THE FLAG?</h6>
          <button className="bigass" onClick={this.addDistance.bind(this)}>2m</button>
        </div>
      )
    }

    return(<div>Saving...</div>)
  }
}
