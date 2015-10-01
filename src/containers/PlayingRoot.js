import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import { filter, values } from 'lodash';

import { connect } from 'react-redux';
// import { ImmutablePropTypes } from 'react-immutable-proptypes';
import TextFilter from 'react-text-filter';

import Listing from 'views/Listing';
import Loading from 'views/Loading';

import { selectItem, deSelectItem, filterItems } from '../actions';


@connect(state => ({
  loading: state.clubs.get('loading'),
  clubs: state.clubs.get('clubs').toJS(),
  courses: state.clubs.get('courses').toJS(),
  slopes: state.clubs.get('slopes').toJS(),
  courseId: state.play.get('courseId'),
  clubId: state.play.get('clubId'),
  slopeId: state.play.get('slopeId'),
  filterQuery: state.clubs.get('filterQuery'),
  filteredClubs: state.clubs.get('filteredClubs').toJS(),
  shots: state.play.get('shots').toJS()
}))


export default class PlayingRoot extends Component {
  static propTypes = {
    dispatch      : PropTypes.func.isRequired,
    loading       : PropTypes.bool.isRequired,
    filterQuery   : PropTypes.string.isRequired,
    filteredClubs : PropTypes.array.isRequired,

    clubs         : PropTypes.array.isRequired,
    courses       : PropTypes.array.isRequired,
    slopes        : PropTypes.array.isRequired,

    shots         : PropTypes.array.isRequired,

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
    const { loading, clubs, courses, slopes, clubId,
            courseId, slopeId, filteredClubs, filterQuery
          } = this.props;

    if ( loading ) {
      return <Loading />;
    }

    let title = '';
    let items = [];
    let itemType = '';
    let back = '';
    let filterField = '';
    const isFiltering = filterQuery !== '';

    if ( typeof(clubId) !== 'number' ) {
      title = 'What club are you playing at today?';
      itemType = 'club';
      filterField = <TextFilter onFilter={(query) => ::this.filterItems({query})} />;
      items = isFiltering ? filteredClubs : clubs;
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

    return (<Listing
               title={title}
               items={values(items)}
               itemType={itemType}
               back={back}
               filterField={filterField}
               selectItem={::this.selectItem} />
    );
  }
}
