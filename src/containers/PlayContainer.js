import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import { fetchHolesIfNeeded } from 'actions/holes';
import { changeHole, endRound } from 'actions/play';

import Loading from 'views/Loading';
import HoleView from 'views/HoleView';
import HoleSwitcher from 'views/HoleSwitcher';
import ConfirmButton from 'views/ConfirmButton';

// const boolOrObject = PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired;

const mapStateToProps = (state) => ({
  loading: state.play.get('loading'),
  holes: state.play.get('holes').toJS(),
  club: state.play.get('club').toJS(),
  course: state.play.get('course').toJS(),
  slope: state.play.get('slope').toJS(),
  shots: state.play.get('shots').toJS(),
  currentHole: state.play.get('currentHole')
});

export class PlayContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    holes: PropTypes.array.isRequired,
    club: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    slope: PropTypes.object.isRequired,
    shots: PropTypes.array.isRequired,
    currentHole: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch( fetchHolesIfNeeded(this.props.slope.id) );
  }

  changeHole (value) {
    this.props.dispatch( changeHole(value) );
  }

  render () {
    const { loading, shots, holes, dispatch, currentHole} = this.props;

    if ( loading ) {
      return <Loading />;
    } else {
      const holeViews = holes.map( (hole) => {
        return <HoleView key={hole.id} hole={hole} shots={shots} dispatch={dispatch} />;
      });

      return (
        <div>
          <SwipeableViews index={currentHole} onChangeIndex={::this.changeHole}>
            { holeViews }
          </SwipeableViews>
          <HoleSwitcher currentIndex={currentHole} maxIndex={holes.length - 1} changeHole={::this.changeHole}/>
          <ConfirmButton title="AVSLUTA RUNDA" question="For realz?" onConfirm={() => ::this.props.dispatch(endRound())} />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(PlayContainer);
