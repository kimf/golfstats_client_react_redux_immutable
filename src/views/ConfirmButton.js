import React, { Component, PropTypes } from 'react';

export default class ConfirmButton extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { confirmed: false };
  }

  setConfirm () {
    this.setState( { confirmed: true } );
  }

  cancelConfirm () {
    this.setState( { confirmed: false });
  }

  render() {
    const { onConfirm, title, question } = this.props;
    if ( this.state.confirmed ) {
      return (
        <span className="btngroup">
          <button className="btn" onClick={::this.cancelConfirm}>nah!</button>
          <button className="btn warning" onClick={onConfirm}>{question}</button>
        </span>
        );
    } else {
      return <button className="btn warning" onClick={::this.setConfirm}>{title}</button>;
    }
  }
}
