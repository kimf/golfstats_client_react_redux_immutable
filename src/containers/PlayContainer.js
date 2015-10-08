import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import { fetchHolesIfNeeded } from 'actions/holes';
import { changeHole } from 'actions/play';

import Loading from 'views/Loading';
import HoleView from 'views/HoleView';
import HoleSwitcher from 'views/HoleSwitcher';
import ScorecardView from 'views/ScorecardView';
import Modal from 'views/Modal';


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
    shots: PropTypes.object.isRequired,
    currentHole: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);
  }

  state = {
    showScorecard: false
  }

  componentDidMount () {
    this.props.dispatch( fetchHolesIfNeeded(this.props.slope.id) );
  }

  changeHole (value) {
    this.props.dispatch( changeHole(value) );
  }

  showScorecard () {
    const shown = this.state.showScorecard;
    this.setState({showScorecard: shown ? false : true});
  }

  render () {
    const { loading, shots, holes, dispatch, currentHole} = this.props;

    if ( loading ) {
      return <Loading />;
    } else {
      const holeViews = holes.map( (hole) => {
        return (
          <HoleView key={hole.id}
                    hole={hole}
                    shots={shots[hole.id]}
                    dispatch={dispatch} />
        );
      });

      return (
        <div>
          <SwipeableViews index={currentHole} onChangeIndex={::this.changeHole}>
            { holeViews }
          </SwipeableViews>
          <footer>
            <HoleSwitcher currentIndex={currentHole} maxIndex={holes.length - 1} changeHole={::this.changeHole}/>
            <button className="scorecardbtn btn" onClick={::this.showScorecard}>SCORECARD</button>
          </footer>
          <Modal isOpen={this.state.showScorecard} transitionName="modal-anim">
            <ScorecardView
              onClose={::this.showScorecard}
              dispatch={dispatch}
              holes={holes}
              shots={shots} />
          </Modal>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(PlayContainer);
