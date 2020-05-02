const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => jwt.sign({ user: user.id }, process.env.PASSPORT_SECRET, {
  expiresIn: '365 days',
});

const loginUserToCtx = async (user, ctx) => {
  const token = generateToken(user);
  ctx.set('Access-Control-Expose-Headers', 'Authorization');
  ctx.set('Authorization', `JWT ${token}`);
  ctx.user = user;
};

const validatePassword = async (password1, password2) => await bcrypt.compare(password1, password2);

module.exports = {
  generateToken,
  loginUserToCtx,
  validatePassword,
};
