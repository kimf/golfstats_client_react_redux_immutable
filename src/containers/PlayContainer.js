import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchHolesIfNeeded } from 'actions/holes'
import { changeHole } from 'actions/play'

import Loading from 'views/Loading'
import HoleView from 'views/HoleView'
import HoleSwitcher from 'views/HoleSwitcher'
import ScorecardView from 'views/ScorecardView'
import Modal from 'views/Modal'

const mapStateToProps = (state) => ({
  loading: state.play.loading,
  holes: state.play.holes,
  club: state.play.club,
  course: state.play.course,
  slope: state.play.slope,
  shots: state.play.shots,
  currentHole: state.play.currentHole
})

class PlayContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    holes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    slope: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    shots: PropTypes.shape().isRequired,
    currentHole: PropTypes.number.isRequired
  }

  state = {
    showScorecard: false
  }

  componentDidMount() {
    if (this.props.slope) {
      this.props.dispatch(fetchHolesIfNeeded(this.props.slope.id))
    }
  }

  changeHole = (value) => {
    this.props.dispatch(changeHole(value))
  }

  showScorecard = () => {
    this.setState(state => ({ showScorecard: !state.showScorecard }))
  }

  render() {
    const { loading, shots, holes, dispatch, currentHole } = this.props

    if (loading) {
      return <Loading />
    }

    const hole = holes[currentHole]

    return (
      <div>
        <HoleView
          key={hole.id}
          hole={hole}
          shots={shots[hole.id]}
          dispatch={dispatch}
        />
        <footer>
          <HoleSwitcher currentIndex={currentHole} maxIndex={holes.length - 1} changeHole={this.changeHole} />
          <button className="scorecardbtn btn" onClick={this.showScorecard}>SCORECARD</button>
        </footer>
        <Modal isOpen={this.state.showScorecard} transitionName="modal-anim">
          <ScorecardView
            onClose={this.showScorecard}
            dispatch={dispatch}
            holes={holes}
            shots={shots}
          />
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps)(PlayContainer)
