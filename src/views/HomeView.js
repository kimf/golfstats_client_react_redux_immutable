import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CourseListItem from 'views/CourseListItem';

// We define mapStateToProps where we'd normally use the @connect
// decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  loading : state.courses.loading,
  courses : state.courses.data
});

export class HomeView extends Component {
  static propTypes = {
    dispatch : React.PropTypes.func,
    courses  : React.PropTypes.array
  }

  constructor () {
    super();
  }

  // normally you'd import an action creator, but I don't want to create
  // a file that you're just going to delete anyways!
  _selectCourse (id) {
    this.props.dispatch({ type : 'SELECT_COURSE', id: id });
  }

  render () {
    if ( this.props.courses.loading ) {
      return ( <div>LOADING...</div> );
    } else {
      return (
        <div className='container text-center'>
          <h1>Golfstats</h1>

          <ul>
             {this.props.courses.map((course, index) =>
               <CourseListItem {...course}
                     key={index}
                     onClick={() => ::this._selectCourse(course.id)} />
             )}
           </ul>
        </div>
      );
    }
  }
}

HomeView.propTypes = {
  courses: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(HomeView);
