import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'styles/core.scss'
import SetupRoundContainer from 'containers/SetupRoundContainer'
import PlayContainer from 'containers/PlayContainer'

const Root = ({ store }) => (
  <div className="root">
    <Provider store={store}>
      <Router>
        <div className="container">
          <Route name="home" exact path="/" component={SetupRoundContainer} />
          <Route name="play" path="/play" component={PlayContainer} />
        </div>
      </Router>
    </Provider>
  </div>
)

Root.propTypes = {
  store: PropTypes.shape().isRequired
}

export default Root
