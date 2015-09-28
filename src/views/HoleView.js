import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

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

    return (
      <div className='content'>
        <h1>{hole.hole.number} - {hole.length}m. Par: {hole.hole.par}</h1>
      </div>
    );
  }
}
