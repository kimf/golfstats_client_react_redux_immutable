import React, { Component, PropTypes } from 'react';
import ListItem from 'views/ListItem';

export default class ClubList extends Component {
  static propTypes = {
    selectClub : React.PropTypes.func,
    clubs  : React.PropTypes.array
  }

  constructor () {
    super();
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Golfstats</h1>

        <ul>
           {this.props.clubs.map((club, index) =>
             <ListItem
                   title={club.name}
                   key={index}
                   onClick={() => ::this.props.selectClub(club.id)} />
           )}
         </ul>
      </div>
    );
  }
}

ClubList.propTypes = {
  clubs: PropTypes.array.isRequired
};
