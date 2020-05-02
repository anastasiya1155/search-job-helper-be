const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../database/connection');

const UserModel = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: 'This email is already taken',
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
});


UserModel.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  // eslint-disable-next-line no-param-reassign
  user.password = await bcrypt.hash(user.password, salt);
});

UserModel.beforeUpdate(async (user) => {
  // eslint-disable-next-line no-underscore-dangle
  if (user._changed.password) {
    const salt = await bcrypt.genSalt(10);
    // eslint-disable-next-line no-param-reassign
    user.password = await bcrypt.hash(user.password, salt);
  }
});


module.exports = UserModel;
