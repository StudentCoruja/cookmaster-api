const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 100, // Limite de 100 requisições por IP
  message: 'Muitas requisições vindas deste IP. Por favor, tente novamente mais tarde.',
  standardHeaders: true, // Inclui informações de limite nos headers `RateLimit-*`
  legacyHeaders: false, // Desabilita os headers `X-RateLimit-*`
});

module.exports = limiter;
