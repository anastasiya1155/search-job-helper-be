module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'jobs',
    'active',
    { type: Sequelize.BOOLEAN, defaultValue: true },
  ).then(() => queryInterface.addColumn(
    'jobs',
    'salary_ask',
    { type: Sequelize.INTEGER },
  )).then(() => queryInterface.addColumn(
    'jobs',
    'salary_offer',
    { type: Sequelize.INTEGER },
  )).then(() => queryInterface.addColumn(
    'jobs',
    'offer',
    { type: Sequelize.BOOLEAN, defaultValue: false },
  ))
    .then(() => queryInterface.addColumn(
      'jobs',
      'time_to_office',
      { type: Sequelize.INTEGER },
    ))
    .then(() => queryInterface.addColumn(
      'jobs',
      'test_task',
      { type: Sequelize.STRING },
    )),

  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn(
      'jobs',
      'active',
    ),
    queryInterface.removeColumn(
      'jobs',
      'salary_ask',
    ),
    queryInterface.removeColumn(
      'jobs',
      'salary_offer',
    ),
    queryInterface.removeColumn(
      'jobs',
      'time_to_office',
    ),
    queryInterface.removeColumn(
      'jobs',
      'offer',
    ),
    queryInterface.removeColumn(
      'jobs',
      'test_task',
    ),
  ]),
};
