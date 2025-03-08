const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Activez CORS (important pour votre frontend React/React Native)
app.use(cors({ origin: true }));

// Proxy toutes les requêtes entrantes vers Firebase Realtime Database
app.use('/', createProxyMiddleware({
  target: 'https://gofast-835a5-default-rtdb.firebaseio.com/',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/', // Vous pouvez aussi gérer des réécritures ici au besoin
  },
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Proxy Firebase fonctionnel sur le port ${PORT}`);
});
