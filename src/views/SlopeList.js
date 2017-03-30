import React from 'react'
import Listing from 'views/Listing'

export default class SlopeList extends Listing {
  itemType = 'slope'
  title = 'From what tee?'
  back = (
    <button className="goback btn block" onClick={() => this.resetChoice('course')}>
      &larr; CHANGE COURSE
    </button>
  )
}
