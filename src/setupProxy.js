const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/bss', {
      target: 'http://pre-pavilion.jd.local',  // 这里是接口服务器地址
      changeOrigin: true,
    })
  )
}
