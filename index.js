const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors({ origin: true }));

const firebaseProxy = createProxyMiddleware({
  target: 'https://gofast-835a5-default-rtdb.firebaseio.com',
  changeOrigin: true,
  ws: true,
  secure: true,
  pathRewrite: {
    '^/': '/', // Laissez inchangé, mais important pour clarté
  },
  logLevel: 'debug', // pour observer clairement ce qu'il se passe
  headers: {
    "Connection": "keep-alive"
  }
});

app.use('/', firebaseProxy);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Proxy Firebase fonctionnel sur le port ${PORT}`);
});

server.on('upgrade', firebaseProxy.upgrade);
