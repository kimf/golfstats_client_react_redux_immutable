import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { createDevToolsWindow } from '../utils';
import { connect } from 'react-redux';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';
import { filter, values } from 'lodash';

import ListItem from 'views/ListItem';
import PlayRoot from 'containers/PlayRoot';

import { selectItem, deSelectItem } from 'actions';
import 'styles/core.scss';

const mapStateToProps = (state) => ({
  loading: state.clubs.get('loading'),
  clubs: state.clubs.get('clubs').toJS(),
  courses: state.clubs.get('courses').toJS(),
  slopes: state.clubs.get('slopes').toJS(),
  courseId: state.play.get('courseId'),
  clubId: state.play.get('clubId'),
  slopeId: state.play.get('slopeId'),
  storageLoaded: state.storage.loaded
});


export class Root extends Component {
  static propTypes = {
    storageLoaded : PropTypes.bool,
    loading       : PropTypes.bool,
    store         : PropTypes.object.isRequired,
    clubs         : PropTypes.array.isRequired,
    courses       : PropTypes.array.isRequired,
    slopes        : PropTypes.array.isRequired,
    courseId      : PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]).isRequired,
    clubId: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]).isRequired,
    slopeId: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]).isRequired
  }

  constructor () {
    super();
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  selectItem (model, id) {
    this.props.store.dispatch( selectItem(model, id) );
  }

  resetChoice (what) {
    this.props.store.dispatch( deSelectItem(what) );
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

    const { clubs, courses, slopes,
            clubId, courseId, slopeId,
            loading, storageLoaded
          } = this.props;

    let content = '';
    let title = '';
    let items = [];
    let itemType = '';
    let back = '';

    if ( !storageLoaded ) {
      content = ( <div className="content"><h2>Letar i Localstorage...</h2></div> );
    } else if ( loading ) {
      content = ( <div className="content"><h2>Loading...</h2></div> );
    } else {
      if ( typeof(clubId) !== 'number' ) {
        title = 'What club are you playing at today?';
        itemType = 'club';
        items = clubs;
      } else if ( typeof(courseId) !== 'number' ) {
        title = 'Choose the course';
        itemType = 'course';
        items = filter(courses, { club_id: clubId });
        back  = (<a href="#" onClick={() => ::this.resetChoice('club')}>&larr; CHANGE CLUB </a>);
      } else if ( typeof(slopeId) !== 'number'  ) {
        title = 'From what tee?';
        itemType = 'slope';
        items = filter(slopes, { course_id: courseId });
        back  = (<a href="#" onClick={() => ::this.resetChoice('course')}>&larr; CHANGE COURSE </a>);
      } else {
        const currentClub = clubs[clubId];
        const currentCourse = courses[courseId];
        const currentSlope = slopes[slopeId];
        content = <PlayRoot tee={currentSlope} course={currentCourse} club={currentClub} />;
      }
    }

    if ( content === '' ) {
      content = (
      <div className="container">
        { back }

        <h2>{title}</h2>

        <ul>
          {values(items).map((item) =>
            <ListItem title={item.name}
                      onClick={() => ::this.selectItem(itemType, item.id)}
                      key={item.id} />
          )}
         </ul>
      </div>
      );
    }

    return (
      <div>
        {debugTools}
        <Provider store={this.props.store}>
          { content }
        </Provider>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Root);
