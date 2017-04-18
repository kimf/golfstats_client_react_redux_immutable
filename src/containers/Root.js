import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import 'styles/core.scss'
import App from 'App'


const Root = ({ store }) => {
  return (
    <div className="root">
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </div>
  )
}

Root.propTypes = {
  store: PropTypes.shape().isRequired
}

export default Root
