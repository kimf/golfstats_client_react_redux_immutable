import React, { Component, PropTypes } from 'react';

export default class HoleView extends Component {
  static propTypes = {
    hole   : PropTypes.object.isRequired
  }

  constructor () {
    super();
  }

  render () {
    const { hole } = this.props;

    return (
      <div className='container text-center'>
        <h1>{hole.number} - {hole.length}</h1>
      </div>
    );
  }
}
