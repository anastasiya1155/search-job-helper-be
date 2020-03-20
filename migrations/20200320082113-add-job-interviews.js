module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'jobs',
    'interviews',
    { type: Sequelize.INTEGER },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'jobs',
    'interviews',
  ),
};
