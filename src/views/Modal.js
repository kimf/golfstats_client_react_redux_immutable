import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    transitionName: PropTypes.string,
    children: PropTypes.object
  }

  render () {
    const { isOpen, transitionName, children } = this.props;

    if (isOpen) {
      return (
        <ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="modal">
            {children}
          </div>
        </ReactCSSTransitionGroup>
      );
    } else {
      return <ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300} />;
    }
  }
}
