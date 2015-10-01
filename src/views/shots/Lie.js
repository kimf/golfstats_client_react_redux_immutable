import React, { Component, PropTypes } from 'react';

export default class Lie extends Component {
  static propTypes = {
    addLie: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.lies = ['TEE', 'FAIRWAY', 'ROUGH', 'GREENSIDE ROUGH', 'FRINGE', 'FAIRWAY BUNKER', 'GREENSIDE BUNKER'];
    this.state = {};
  }


  render () {
    const { addLie } = this.props;

    return (
      <div className="teeshot">
        <h2>WHERE DID YOU HIT FROM?</h2>
        { this.lies.map((lie, index) =>
          <button className="bigass" key={index} onClick={() => addLie(lie)}>{lie}</button>
        )}
      </div>
    );
  }
}
