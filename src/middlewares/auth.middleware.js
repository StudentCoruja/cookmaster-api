// src/middleware/auth.middleware.js

const { verifyToken } = require('../utils/manager.JWT');

const authenticateToken = (req, res, next) => {
  const bearerToken = req.headers.authorization; // Token deve ser enviado no cabeçalho da requisição

  if (!bearerToken) return res.status(401).json({ error: 'Token Not Found!' });

  const token = bearerToken.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token Not Found!' });

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = decoded; // Adiciona os dados do usuário decodificados no objeto req
  return next();
};

module.exports = authenticateToken;
