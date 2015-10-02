import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchHolesIfNeeded } from 'actions/holes';
import { endRound, addShot, removeShot } from 'actions/play';

import Loading from 'views/Loading';
import HoleSwitcher from 'views/HoleSwitcher';
import ConfirmButton from 'views/ConfirmButton';

// const boolOrObject = PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired;

const mapStateToProps = (state) => ({
  loading: state.play.get('loading'),
  holes: state.play.get('holes').toJS(),
  club: state.play.get('club').toJS(),
  course: state.play.get('course').toJS(),
  slope: state.play.get('slope').toJS()
});

export class PlayContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    holes: PropTypes.array.isRequired,
    club: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    slope: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch( fetchHolesIfNeeded(this.props.slope.id) );
  }

  // _increment () {
  //   this.props.dispatch({ type : 'COUNTER_INCREMENT' });
  // }

  // <button className='btn btn-default'
  //         onClick={::this._increment}>

  render () {
    const { loading, holes, club, course, slope, dispatch } = this.props;

    if ( loading ) {
      return <Loading />;
    } else {
      const holeIndex = parseInt(this.props.params.index, 10);
      const hole = holes[holeIndex];

      return (
        <div>
          <h2>{hole.number}</h2>
          <HoleSwitcher currentIndex={holeIndex} maxIndex={holes.length} />
          <ConfirmButton title="AVSLUTA RUNDA" question="For realz?" onConfirm={() => ::this.props.dispatch(endRound())} />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(PlayContainer)
