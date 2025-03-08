const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors({ origin: true }));

// Middleware qui ajoute automatiquement ".json" aux URL Firebase
app.use('/', (req, res, next) => {
  if (!req.url.includes('.json')) {
    // Gérez uniquement les URLs de base, évitez les websockets Firebase
    if (!req.url.startsWith('/.ws') && !req.url.startsWith('/.lp')) {
      req.url += '.json';
    }
  }
  next();
});

const firebaseProxy = createProxyMiddleware({
  target: 'https://gofast-835a5-default-rtdb.firebaseio.com',
  changeOrigin: true,
  ws: true
});

app.use('/', firebaseProxy);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Proxy Firebase fonctionnel sur le port ${PORT}`);
});

server.on('upgrade', firebaseProxy.upgrade);
