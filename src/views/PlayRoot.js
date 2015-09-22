import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';


export default class PlayRoot extends Component {
  static propTypes = {
    store      : React.PropTypes.object.isRequired,
    loading    : PropTypes.bool,
    selectHole : PropTypes.func.isRequired,
    tee        : PropTypes.object.isRequired,
    course     : PropTypes.string.isRequired,
    club       : PropTypes.string.isRequired
  }

  constructor () {
    super();
  }

  componentDidMount () {
    this.props.store.dispatch( fetchSlopeIfNeeded(this.props.tee.id) );
  }

  render () {
    const { course, club, tee } = this.props;
    if (typeof(tee.holes) === 'undefined') {
      return ( <div>LOADING HOLE DATA...</div> );
    } else {
      return (
        <div className='container text-center'>
          <h1>{club} - {course} - {tee.name}</h1>

          <ul>
             {tee.holes.map((hole, index) =>
               <ListItem
                 title={hole.number + ' - (' + hole.length + 'm)'}
                 key={index}
                 onClick={() => ::this.props.selectHole(hole.id)} />
             )}
           </ul>
        </div>
      );
    }
  }
}
