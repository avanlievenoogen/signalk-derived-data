const _ = require('lodash')

module.exports = function (app, plugin) {
  return {
    group: 'course data',
    optionKey: 'nwp_BRG_mag_RMB',
    title: 'Next Waypoint Bearing Mangetic (based on nextWaypointBearingTrue and magneticVarition) (based on courseRhumbLine)',
    derivedFrom: ['navigation.courseRhumbLine.nextPoint.bearingTrue', 'navigation.magneticVariation'],
    defaults: [undefined, 9999],
    calculator: function (nextWaypointBrgTrue, magneticVariation) {
      if (magneticVariation === 9999) {
        magneticVariation = app.getSelfPath(
          'navigation.magneticVariation.value'
        )
        if (_.isUndefined(magneticVariation)) {
          return
        }
      }
      var nextWaypointBrgMag = nextWaypointBrgTrue  - magneticVariation
      if (nextWaypointBrgMag  < 0) {
        nextWaypointBrgMag  = Math.PI * 2 + nextWaypointBrgMag
      } else if (nextWaypointBrgMag > Math.PI * 2) {
        nextWaypointBrgMag = nextWaypointBrgMag - Math.PI * 2
      }
      return [{ path: 'navigation.courseRhumbLine.nextPoint.bearingMagnetic', value: nextWaypointBrgMag }]
    }
  }
}
