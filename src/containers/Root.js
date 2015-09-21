import React        from 'react';
import { Provider } from 'react-redux';
import { createDevToolsWindow } from '../utils';
import { connect } from 'react-redux';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';

import HomeView from 'views/HomeView';
import SetupView from 'views/SetupView';

import { fetchCoursesIfNeeded, selectCourse } from 'actions';
import 'styles/core.scss';

const mapStateToProps = (state) => ({
  loading : state.courses.loading,
  courses : state.courses.data,
  currentCourse: state.courses.currentCourse
});


export class Root extends React.Component {
  static propTypes = {
    loading  : React.PropTypes.bool,
    store    : React.PropTypes.object.isRequired,
    courses  : React.PropTypes.array,
    currentCourse : React.PropTypes.object
  }

  constructor () {
    super();
  }

  componentDidMount () {
    this.props.store.dispatch( fetchCoursesIfNeeded() );
  }

  selectCourse (courseId) {
    this.props.store.dispatch( selectCourse(courseId) );
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
      const currentCourse = this.props.currentCourse;

      if ( typeof(currentCourse) !== 'undefined' ) {
        renderingComponent = <SetupView club={currentCourse} selectCourse={this.selectCourse.bind(this)} />;
      } else {
        renderingComponent =  <HomeView courses={this.props.courses} selectCourse={this.selectCourse.bind(this)} />;
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
