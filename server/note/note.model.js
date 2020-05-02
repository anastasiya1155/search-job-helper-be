const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const NoteModel = sequelize.define('note', {
  title: {
    type: Sequelize.TEXT,
  },
  text: {
    type: Sequelize.TEXT,
  },
  frequency: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
  },
}, {
  underscored: true,
});

module.exports = NoteModel;
