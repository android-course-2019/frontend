export function install (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    if (typeof navigator.geolocation === 'undefined') {
      return cb(false)
    }
    // pass through the geolocation object
    Vue.cordova.geolocation = navigator.geolocation
    return cb(true)
  }, false)
}
