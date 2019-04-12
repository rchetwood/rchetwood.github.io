'use strict'

/**
   This class defines line styles of various shapes.
*/
function LineStyle () {
  const styles = {
    SOLID = 'solid',
    DOTTED = 'dotted'
  }
  // TODO
  const SOLID_STROKE = undefined
  const DOTTED_STROKE = undefined
  return {
    getStroke: () => {
      if (this === DOTTED) { 
        return DOTTED_STROKE 
      }
      if (this === SOLID) { 
        return SOLID_STROKE 
      }
      return undefined
    }
  }
}

module.exports = {
  LineStyle
}
