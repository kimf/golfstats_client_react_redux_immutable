import React, { PropTypes } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Loading from 'views/Loading'
import SetupRoundContainer from 'containers/SetupRoundContainer'
import PlayContainer from 'containers/PlayContainer'

const App = ({ rehydrated }) => {
  if (!rehydrated) {
    return <Loading />
  }

  return (
    <div className="container">
      <Route name="home" exact path="/" component={SetupRoundContainer} />
      <Route name="play" path="/play" component={PlayContainer} />
    </div>
  )
}
const mapStateToProps = (state) => ({ ...state.appReducer })

App.propTypes = {
  rehydrated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(App)
