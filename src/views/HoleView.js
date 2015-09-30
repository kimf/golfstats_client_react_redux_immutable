import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

import PageContainer from 'react-page-transitions'

export default class HoleView extends Component {
  static propTypes = {
    hole      : PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  render () {
    const { hole } = this.props;

    // if(lie == 'IN THE HOLE') {
    //   shotButton = '... delete last shot here maybe ?...'
    // } else if(lie == 'GREEN') {
    //   shotButton = <Putt addPutt={this.addShot.bind(this)} />
    // } else {
    //   shotButton = <Shot lie={lie} par={hole.par} length={tee.length} addShot={this.addShot.bind(this)} />
    // }

    return (
      <div className='content'>
        <h1>{hole.hole.number} - {hole.length}m. Par: {hole.hole.par}</h1>
      </div>
    );
  }
}
