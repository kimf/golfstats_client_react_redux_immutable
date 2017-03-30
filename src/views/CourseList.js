import React from 'react'
import Listing from 'views/Listing'

export default class CourseList extends Listing {
  itemType = 'course'
  title = 'What course?'
  back = (
    <button className="goback btn block" onClick={() => this.resetChoice('club')}>
      &larr; CHANGE CLUB
    </button>
  )
}
