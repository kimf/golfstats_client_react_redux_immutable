import React, { PropTypes } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const Modal = ({ isOpen, transitionName, children }) => {
  if (isOpen) {
    return (
      <CSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div className="modal" key="modal">
          {children}
        </div>
      </CSSTransitionGroup>
    )
  } else {
    return <CSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300} />
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  transitionName: PropTypes.string.isRequired,
  children: PropTypes.node
}

Modal.defaultProps = {
  isOpen: false,
  children: null
}
