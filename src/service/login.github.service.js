const axios = require('axios');

const { createToken } = require('../utils/manager.JWT');

// Variáveis de configuração
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';

const createRequestBody = (code) => ({
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  code,
});

const fetchAccessToken = async (body) => {
  const tokenResponse = await axios.post(
    GITHUB_TOKEN_URL,
    body,
    { headers: { Accept: 'application/json' } },
  );
  return tokenResponse.data.access_token;
};

const fetchUserData = async (accessToken) => {
  const userResponse = await axios.get(GITHUB_USER_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const { id, email, name } = userResponse.data;
  return { id, email, name };
};

// Processa o código recebido no redirecionamento do GitHub
const createAccess = async (code) => {
  const body = createRequestBody(code);
  const accessToken = await fetchAccessToken(body);
  const userData = await fetchUserData(accessToken);
  return createToken({ ...userData, role: 'user' });
};

module.exports = {
  createAccess,
};
