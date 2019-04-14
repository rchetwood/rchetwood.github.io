'use strict'

/**
   This class defines line styles of various shapes.
   Skip dotted Line for now.
*/
function LineStyle () {
  const styles = {
    SOLID = 'solid',
    DOTTED = 'dotted'
  }
  // TODO
  // How to define these with SVG?
  const SOLID_STROKE = ''
  const DOTTED_STROKE = '4'
  return {
    getStroke: () => {
      if (this === styles.DOTTED) { 
        return DOTTED_STROKE 
      }
      if (this === styles.SOLID) { 
        return SOLID_STROKE 
      }
      return undefined
    }
  }
}

module.exports = {
  LineStyle
}
