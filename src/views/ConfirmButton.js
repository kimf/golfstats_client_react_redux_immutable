import React, { Component, PropTypes } from 'react'

export default class ConfirmButton extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired
  }

  state = { confirmed: false }

  toggleConfirm = () => {
    this.setState(state => ({ ...state, confirmed: !state.confirmed }))
  }

  render() {
    const { onConfirm, title, question } = this.props
    if (this.state.confirmed) {
      return (
        <span className="btngroup">
          <button className="btn" onClick={this.toggleConfirm}>nah!</button>
          <button className="btn warning" onClick={onConfirm}>{question}</button>
        </span >
      )
    } else {
      return <button className="btn warning" onClick={this.toggleConfirm}>{title}</button >
    }
  }
}
