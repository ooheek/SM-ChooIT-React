const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://15.165.169.129/',
      changeOrigin: true,
    }),
  )
}
