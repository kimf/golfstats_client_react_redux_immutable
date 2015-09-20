import React        from 'react';
import { Provider } from 'react-redux';
import { Router }   from 'react-router';
import routes       from '../routes';
import { createDevToolsWindow } from '../utils';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';
import { fetchCoursesIfNeeded } from 'actions';

export default class Root extends React.Component {
  static propTypes = {
    store          : React.PropTypes.object.isRequired,
    routerHistory  : React.PropTypes.object.isRequired
  }

  constructor () {
    super();
  }

  componentDidMount () {
    this.props.store.dispatch( fetchCoursesIfNeeded() );
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

  renderRouter () {
    return (
      <Router history={this.props.routerHistory}>
        {routes}
      </Router>
    );
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
          {this.renderRouter()}
        </Provider>
      </div>
    );
  }
}
