const slowDown = require('express-slow-down');

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutos
  delayAfter: 50, // Começa a desacelerar após 50 requisições
  delayMs: (hits) => hits * 100, // Aumenta o delay em 100ms para cada requisição
});

module.exports = speedLimiter;
