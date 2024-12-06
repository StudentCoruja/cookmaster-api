const userService = require('../service/user.service');
const loginGitHubService = require('../service/login.github.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.findUserByEmail({ email, password });

  if (token.error) {
    return res.status(400).json({ error: token.error });
  }

  return res.status(200).json({ token });
};

const loginWithGitHub = (_req, res) => {
  const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
  const { GITHUB_CLIENT_ID } = process.env;

  const redirectUri = `${GITHUB_AUTH_URL}?client_id=${GITHUB_CLIENT_ID}&scope=read:user`;
  return res.redirect(redirectUri);
};

// função que recebe o código de autorização e troca por um token de acesso
const callback = async (req, res) => {
  const { code } = req.query;

  const token = await loginGitHubService.createAccess(code);

  return res.status(200).json({ token });
};

module.exports = {
  login,
  loginWithGitHub,
  callback,
};
