const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/images',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      pathRewrite: {
        '^/images': '',
      },
    })
  );
};