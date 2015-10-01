import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

import ListItem from 'views/ListItem';
import Loading from 'views/Loading';

import { fetchScorecardsIfNeeded, selectScorecard } from '../scorecard_actions';

@connect(state => ({
  loading: state.scorecards.get('loading'),
  holes: state.scorecards.get('scorecards').toJS(),
  scorecard: state.scorecards.get('scorecard')
}))

export default class ScorecardRoot extends Component {
  static propTypes = {
    dispatch   : PropTypes.func.isRequired,
    loading    : PropTypes.bool.isRequired,
    scorecards : PropTypes.array.isRequired,
    scorecard  : PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]).isRequired
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch( fetchScorecardsIfNeeded() );
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  render () {
    const { loading, scorecards, scorecard } = this.props;
    let contentDiv = '';

    if (loading || scorecards.length === 0) {
      contentDiv = <Loading />;
    } else if ( typeof(scorecard) === 'number' ) {
      contentDiv = (
        <div>
          <h2>SHOW SCORECARD</h2>
        </div>
      );
    } else {
      contentDiv = (
        <div className="content">
          <h2>SCORECARDS</h2>

          <ul>
           {scorecards.map((t, index) =>
             <ListItem
               title={t.scorecard.strokes}
               key={index}
               onClick={() => ::this.props.dispatch(selectScorecard(index))} />
           )}
          </ul>
        </div>
      );
    }

    return (
      <div className='content'>
        { contentDiv }
      </div>
    );
  }
}
