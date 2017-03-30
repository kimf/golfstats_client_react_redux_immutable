import React, { PropTypes } from 'react'

const HoleSwitcher = ({ maxIndex, currentIndex, changeHole }) => {
  let next = ''
  let prev = ''

  if (currentIndex < maxIndex) {
    next = <button className="btn next" onClick={() => changeHole(currentIndex + 1)}>NEXT HOLE &rarr;</button>
  }

  if (currentIndex > 0) {
    prev = <button className="btn prev" onClick={() => changeHole(currentIndex - 1)}>&larr; PREV HOLE</button>
  }

  return (
    <div>
      {prev}
      {next}
    </div>
  )
}

HoleSwitcher.propTypes = {
  maxIndex: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  changeHole: PropTypes.func.isRequired
}

export default HoleSwitcher
