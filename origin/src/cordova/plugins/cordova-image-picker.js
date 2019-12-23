export function install (Vue, options, cb) {
  document.addEventListener('deviceready', () => {
    if (typeof window.imagePicker === 'undefined') {
      return cb(false)
    }
    window.imagePicker['getPicturesOri'] = window.imagePicker.getPictures
    window.imagePicker['hasReadPermissionOri'] = window.imagePicker.hasReadPermission
    window.imagePicker.getPictures = options => {
      return new Promise((resolve, reject) => {
        window.imagePicker.getPicturesOri(
          function (res) {
            resolve(res)
          },
          function (err) {
            reject(err)
          },
          options)
      })
    }
    window.imagePicker.hasReadPermission = _ => {
      return new Promise(resolve => {
        window.imagePicker.hasReadPermissionOri(function (res) {
          resolve(res)
        })
      })
    }
    Vue.cordova.imagePicker = window.imagePicker
    return cb(true)
  }, false)
}
