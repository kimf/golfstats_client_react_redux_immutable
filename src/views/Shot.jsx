import React from 'react'
import Result from './shots/Result'
import Club from './shots/Club'
import Lie from './shots/Lie'
import Miss from './shots/Miss'
import Distance from './shots/Distance'

import _ from 'lodash'
import $ from 'jquery'

export default class Shot extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lie: props.lie,
      success: null,
      going_for: null,
      club: null,
      distance_from_hole: null,
      proximity_to_hole: null,
      miss_position: null,
      end_lie: null
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if(this.finished()){
      let state = this.state
      this.state = {
        lie: state.end_lie,
        success: null,
        going_for: null,
        club: null,
        distance_from_hole: null,
        proximity_to_hole: null,
        miss_position: null,
        end_lie: null
      }
      this.props.addShot(state)
    }
  }

  addClub(club) {
    this.setState({ club: club })
  }

  addResult(result) {
    let going_for = 'FAIRWAY'
    let success = false
    let end_lie = null

    if(_.includes(['HIT GREEN', 'MISS GREEN', 'IN THE HOLE'], result)){
      going_for = 'GREEN'
    }
    if(_.includes(['HIT GREEN', 'HIT FAIRWAY', 'IN THE HOLE'], result)){
      success = true
    }

    if(result == 'HIT FAIRWAY'){
      end_lie = 'FAIRWAY'
    }

    if(result == 'HIT GREEN'){
      end_lie = 'GREEN'
    }

    if(result == 'IN THE HOLE'){
      end_lie = 'IN THE HOLE'
    }

    this.setState({
      going_for: going_for,
      success: success,
      end_lie: end_lie
    })
  }

  addDistance(distance_from_hole) {
    this.setState({ distance_from_hole: distance_from_hole })
  }

  addLie(lie) {
    this.setState( { lie: lie } )
  }

  addEndLie(end_lie) {
    this.setState( { end_lie: end_lie } )
  }

  addMissPosition(miss_position) {
    this.setState({ miss_position: miss_position })
  }

  finished() {
    let done = false
    let state = this.state

    //All regular properties are there
    if(state.success != null && state.lie != null && state.club != null && state.going_for != null && state.end_lie != null){
      done = true

      //Special rules apply for Approach shot
      if(state.going_for == "GREEN")
        done = state.distance_from_hole != null

      //Special rules also apply for Misses
      if(state.success == false)
        done = state.miss_position != null
    }

    return done
  }

  render() {
    if(!this.state.lie){
      return <Lie addLie={this.addLie.bind(this)} />
    }

    if(!this.state.club){
      return <Club lie={this.state.lie} addClub={this.addClub.bind(this)} />
    }

    if(this.state.success == null && this.state.going_for == null){
      return <Result par={this.props.par} addResult={this.addResult.bind(this)} />
    }

    if(this.state.miss_position != null && !this.state.end_lie) {
      return <Lie addLie={this.addEndLie.bind(this)} />
    }

    if(!this.state.success && this.state.miss_position == null){
      return <Miss shot={this.state} addMissPosition={this.addMissPosition.bind(this)}/>
    }

    if(this.state.going_for == 'GREEN' && !this.state.distance_from_hole){
      return <Distance shot={this.state} addDistance={this.addDistance.bind(this)}/>
    }

    return( <div>...</div> )

  }
}
