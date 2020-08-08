const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server');

const generateToken = (user) => jwt.sign({ user: user.id }, process.env.PASSPORT_SECRET, {
  expiresIn: '365 days',
});

const loginUserToCtx = async (user, ctx) => {
  const token = generateToken(user);
  ctx.user = user;
  return `JWT ${token}`;
};

const validatePassword = async (password1, password2) => await bcrypt.compare(password1, password2);

const getUser = (token: string) => {
  if (!token) {
    throw new AuthenticationError('No token provided');
  }
  try {
    return jwt.verify(token.replace(/^JWT\s/, ''), process.env.PASSPORT_SECRET);
  } catch (e) {
    console.log('e:', e);
    throw new AuthenticationError(e);
  }
};

module.exports = {
  generateToken,
  loginUserToCtx,
  validatePassword,
  getUser,
};
