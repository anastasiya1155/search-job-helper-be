module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'jobs',
    'interested',
    { type: Sequelize.INTEGER },
  ),

  down: queryInterface => queryInterface.removeColumn(
    'jobs',
    'interested',
  ),
};
