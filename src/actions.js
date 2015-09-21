import fetch from 'isomorphic-fetch';

export const REQUEST_COURSES = 'REQUEST_COURSES';
function requestCourses() {
  return {
    type: REQUEST_COURSES
  };
}

export const RECEIVE_COURSES = 'RECEIVE_COURSES';
function receiveCourses(json) {
  return {
    type: RECEIVE_COURSES,
    courses: json.clubs,
    receivedAt: Date.now()
  };
}

export const SELECT_COURSE = 'SELECT_COURSE';
export function selectCourse(id) {
  return {
    type: SELECT_COURSE,
    id: id
  };
}

function fetchCourses() {
  return dispatch => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestCourses());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://localhost:9292/clubs.json`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveCourses(json))
      );

      // In a real world app, you also want to
      // catch any error in the network call.
  };
}

function shouldFetchCourses(state) {
  const courses = state.courses;
  if (courses.data.length === 0) {
    return true;
  } else if (courses.loading) {
    return false;
  }
}


export function fetchCoursesIfNeeded() {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchCourses(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchCourses());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}
