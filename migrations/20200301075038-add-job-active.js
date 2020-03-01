module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'jobs',
    'active',
    { type: Sequelize.BOOLEAN, defaultValue: true },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'jobs',
    'active',
  ),
};
