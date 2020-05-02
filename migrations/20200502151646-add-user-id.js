module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'jobs',
    'user_id',
    {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  ).then(() => queryInterface.addColumn(
    'notes',
    'user_id',
    {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  )),

  down: (queryInterface) => queryInterface.removeColumn(
    'jobs',
    'user_id',
  ).then(() => queryInterface.removeColumn(
    'notes',
    'user_id',
  )),
};
