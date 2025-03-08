const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors({ origin: true }));

const firebaseProxy = createProxyMiddleware({
  target: 'https://gofast-835a5-default-rtdb.firebaseio.com',
  changeOrigin: true,
  ws: true
});

app.use('/', firebaseProxy);

const PORT = process.env.PORT || 4000;

// ⚠️ Important : stockez "app.listen" dans une variable "server"
const server = app.listen(PORT, () => {
  console.log(`🚀 Proxy Firebase fonctionnel sur le port ${PORT}`);
});

// ✅ Gérez explicitement l'événement websocket upgrade
server.on('upgrade', firebaseProxy.upgrade);
