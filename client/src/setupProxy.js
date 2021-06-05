const { createProxyMiddleware } = require('http-proxy-middleware');

const EXPRESS_HOST = process.env.EXPRESS_HOST || 'localhost';

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/**', { target: `http://${EXPRESS_HOST}:5050` })
  );
};
