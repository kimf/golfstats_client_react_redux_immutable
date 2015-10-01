import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { createDevToolsWindow } from '../utils';
import { connect } from 'react-redux';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';

import PlayingRoot from 'containers/PlayingRoot';
import ScorecardRoot from 'containers/ScorecardRoot';
import Loading from 'views/Loading';
import Play from 'containers/Play';

import 'styles/core.scss';

@connect(state => ({
  storageLoaded: state.storage.loaded,
  activeNav:     state.nav.get('activeNav')
}))


export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    storageLoaded : PropTypes.bool.isRequired,
    activeNav     : PropTypes.string.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
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

    const { storageLoaded, activeNav } = this.props;
    let content = '';
    if ( !storageLoaded ) {
      content = <Loading />;
    } else {
      switch ( activeNav ) {
      case 'playing':
        content = <Play />;
        break;
      case 'scorecards':
        content = <ScorecardRoot />;
        break;
      default:
        content = <PlayingRoot />;
        break;
      }
    }

    return (
      <div className="container">
        {debugTools}
        <Provider store={this.props.store}>
          { content }
        </Provider>
      </div>
    );
  }
}
