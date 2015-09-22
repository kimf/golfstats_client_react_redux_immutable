import React        from 'react';
import { Provider } from 'react-redux';
import { createDevToolsWindow } from '../utils';
import { connect } from 'react-redux';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';

import ClubList from 'views/ClubList';
import CourseList from 'views/CourseList';
import TeeList from 'views/TeeList';
import PlayRoot from 'views/PlayRoot';
import HoleView from 'views/HoleView';

import { fetchClubsIfNeeded, selectWithId } from 'actions';
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
    currentTee    : React.PropTypes.object,
    currentHole   : React.PropTypes.object
  }

  constructor () {
    super();
  }

  componentDidMount () {
    this.props.store.dispatch( fetchClubsIfNeeded() );
  }

  selectTee (teeId) {
    this.props.store.dispatch( selectWithId('TEE', teeId) );
  }

  selectCourse (courseId) {
    this.props.store.dispatch( selectWithId('COURSE', courseId) );
  }

  selectClub (clubId) {
    this.props.store.dispatch( selectWithId('CLUB', clubId) );
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

    const {loading, clubs, currentTee, currentCourse, currentClub} = this.props;

    let renderingComponent = '';
    if ( loading ) {
      renderingComponent = ( <div>LOADING...</div> );
    } else {
      if ( typeof(currentHole) !== 'undefined') {
        renderingComponent = <HoleView hole={currentHole} />;
      } else if ( typeof(currentTee) !== 'undefined' ) {
        renderingComponent = <PlayRoot tee={currentTee} course={currentCourse.name} club={currentClub.name} />;
      } else if ( typeof(currentCourse) !== 'undefined' ) {
        renderingComponent = <TeeList course={currentCourse} club={currentClub.name} selectTee={this.selectTee.bind(this)} />;
      } else if ( typeof(currentClub) !== 'undefined' ) {
        renderingComponent = <CourseList club={currentClub} selectCourse={this.selectCourse.bind(this)} />;
      } else {
        renderingComponent =  <ClubList clubs={clubs} selectClub={this.selectClub.bind(this)} />;
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
