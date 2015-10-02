import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes       from '../routes';
import { ReduxRouter }  from 'redux-router';
import { createDevToolsWindow } from '../utils';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor () {
    super();
  }

  renderDevTools () {
    if (__DEBUG_NW__) {
      createDevToolsWindow(this.props.store);
      return null;
    } else {
      return (
        <DebugPanel top right bottom key='debugPanel'>
          <DevTools store={this.props.store} monitor={LogMonitor} />
        </DebugPanel>
      );
    }
  }

  render () {
    let debugTools = null;

    if (__DEBUG__) {
      debugTools = this.renderDevTools();
    }

    return (
      <div>
        {debugTools}
        <Provider store={this.props.store}>
          <ReduxRouter>
            {routes}
          </ReduxRouter>
        </Provider>
      </div>
    );
  }
}
