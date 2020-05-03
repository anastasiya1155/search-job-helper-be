const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => jwt.sign({ user: user.id }, process.env.PASSPORT_SECRET, {
  expiresIn: '365 days',
});

const loginUserToCtx = async (user, ctx) => {
  const token = generateToken(user);
  ctx.user = user;
  return `JWT ${token}`;
};

const validatePassword = async (password1, password2) => await bcrypt.compare(password1, password2);

const getUser = (token) => {
  try {
    if (token) {
      console.log('token provided', token);
      return jwt.verify(token.replace(/^JWT\s/, ''), process.env.PASSPORT_SECRET);
    }
    console.log('no token');
    return null;
  } catch (e) {
    console.log('e:', e);
    return null;
  }
};

module.exports = {
  generateToken,
  loginUserToCtx,
  validatePassword,
  getUser,
};
