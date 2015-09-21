import React        from 'react';
import { Provider } from 'react-redux';
import { createDevToolsWindow } from '../utils';
import { connect } from 'react-redux';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';

import ClubList from 'views/ClubList';
import SetupView from 'views/SetupView';
import TeeList from 'views/TeeList';

import { fetchClubsIfNeeded, selectCourse, selectClub, selectTee } from 'actions';
import 'styles/core.scss';

const mapStateToProps = (state) => ({
  loading : state.loading,
  clubs : state.clubs,
  currentClub: state.currentClub,
  currentCourse: state.currentCourse,
  currentTee: state.currentTee
});


export class Root extends React.Component {
  static propTypes = {
    loading  : React.PropTypes.bool,
    store    : React.PropTypes.object.isRequired,
    clubs    : React.PropTypes.array,
    currentCourse : React.PropTypes.object,
    currentClub   : React.PropTypes.object,
    currentTee    : React.PropTypes.object
  }

  constructor () {
    super();
  }

  componentDidMount () {
    this.props.store.dispatch( fetchClubsIfNeeded() );
  }

  selectCourse (courseId) {
    this.props.store.dispatch( selectCourse(courseId) );
  }

  selectClub (clubId) {
    this.props.store.dispatch( selectClub(clubId) );
  }

  selectTee (teeId) {
    this.props.store.dispatch( selectTee(teeId) );
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

    let renderingComponent = '';

    if ( this.props.loading ) {
      renderingComponent = ( <div>LOADING...</div> );
    } else {
      const currentClub = this.props.currentClub;
      const currentCourse  = this.props.currentCourse;

      if ( typeof(currentCourse) !== 'undefined') {
        renderingComponent = <TeeList course={currentCourse} club={currentClub.name} selectTee={this.selectTee.bind(this)} />;
      } else if ( typeof(currentClub) !== 'undefined' ) {
        renderingComponent = <SetupView club={currentClub} selectCourse={this.selectCourse.bind(this)} />;
      } else {
        renderingComponent =  <ClubList clubs={this.props.clubs} selectClub={this.selectClub.bind(this)} />;
      }
    }

    return (
      <div>
        {debugTools}
        <Provider store={this.props.store}>
          { renderingComponent }
        </Provider>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Root);
