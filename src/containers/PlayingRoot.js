import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import { find, filter, values } from 'lodash';
import { connect } from 'react-redux';
// import { ImmutablePropTypes } from 'react-immutable-proptypes';
import TextFilter from 'react-text-filter';

import ListItem from 'views/ListItem';
import Loading from 'views/Loading';
import Play from 'views/Play';

import { selectItem, deSelectItem, filterItems } from '../actions';


@connect(state => ({
  loading: state.clubs.get('loading'),
  clubs: state.clubs.get('clubs').toJS(),
  courses: state.clubs.get('courses').toJS(),
  slopes: state.clubs.get('slopes').toJS(),
  courseId: state.play.get('courseId'),
  clubId: state.play.get('clubId'),
  slopeId: state.play.get('slopeId'),
  loadingHoles: state.holes.get('loading'),
  holes: state.holes.get('holes').toJS(),
  hole: state.holes.get('hole'),
  filterQuery: state.clubs.get('filterQuery'),
  filteredClubs: state.clubs.get('filteredClubs')
}))


export default class PlayingRoot extends Component {
  static propTypes = {
    dispatch      : PropTypes.func.isRequired,
    loading       : PropTypes.bool.isRequired,
    filterQuery   : PropTypes.string.isRequired,
    filteredClubs : PropTypes.object.isRequired,

    clubs         : PropTypes.object.isRequired,
    courses       : PropTypes.object.isRequired,
    slopes        : PropTypes.object.isRequired,

    loadingHoles  : PropTypes.bool.isRequired,
    holes         : PropTypes.object.isRequired,
    hole       : PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]).isRequired,

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
    this.props.dispatch( selectItem(model, id) );
  }

  resetChoice (what) {
    this.props.dispatch( deSelectItem(what) );
  }

  filterItems (filterQuery) {
    this.props.dispatch( filterItems(filterQuery) );
  }

  render () {
    const { dispatch, loading, clubs, courses, slopes, clubId,
            courseId, slopeId, loadingHoles, holes, hole, filteredClubs, filterQuery
          } = this.props;

    if ( loading ) {
      return <Loading />;
    }

    if ( typeof(clubId) === 'number' && typeof(courseId) === 'number' && typeof(slopeId) === 'number') {
      const tee = find(slopes, { id: slopeId });
      const course = find(courses, { id: courseId });
      const club = find(clubs, { id: clubId });
      return (
        <Play dispatch={dispatch}
         loading={loadingHoles}
         holes={holes}
         hole={hole}
         tee={tee}
         course={course}
         club={club} />
      );
    }

    let title = '';
    let items = [];
    let itemType = '';
    let back = '';
    let filterField = '';
    const isFiltering = typeof(filterQuery) !== 'undefined';

    if ( typeof(clubId) !== 'number' ) {
      title = 'What club are you playing at today?';
      itemType = 'club';
      filterField = <TextFilter onFilter={(query) => ::this.filterItems({query})} />;
      items = isFiltering ? filteredClubs.toJS() : clubs;
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
    }

    return (
      <div className="container">
        { back }

        <h2>{title}</h2>
        {filterField}
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
}
