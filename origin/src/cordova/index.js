let pluginsList = [
  'cordova-plugin-geolocation',
  'cordova-image-picker'
]

function install (Vue, options) {
  // declare global Vue.cordova object
  Vue.cordova = Vue.cordova || {
    deviceReady: false,
    plugins: []
  }

  Vue.cordova.on = function (eventName, cb) {
    document.addEventListener(eventName, cb, false)
  }

  document.addEventListener('deviceready', function () {
    Vue.cordova.deviceReady = true
  }, false)

  // load supported plugins
  pluginsList.forEach(pluginName => {
    let plugin = require('./plugins/' + pluginName)
    plugin.install(Vue, options, pluginLoaded => {
      if (pluginLoaded) {
        Vue.cordova.plugins.push(pluginName)
      }
      if (Vue.config.debug) {
        console.log('[VueCordova]', pluginName, '→', pluginLoaded ? 'loaded' : 'not loaded')
      }
    })
  })
}

export default {
  install
}
