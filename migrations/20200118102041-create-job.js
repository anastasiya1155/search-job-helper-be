module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('jobs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
    source: {
      type: Sequelize.STRING,
    },
    link: {
      type: Sequelize.STRING,
    },
    team: {
      type: Sequelize.TEXT,
    },
    remoteOption: {
      type: Sequelize.BOOLEAN,
      field: 'remote_option',
    },
    fullyRemote: {
      type: Sequelize.BOOLEAN,
      field: 'fully_remote',
    },
    laptopProvided: {
      type: Sequelize.BOOLEAN,
      field: 'laptop_provided',
    },
    stack: {
      type: Sequelize.TEXT,
    },
    officeAddress: {
      type: Sequelize.STRING,
      field: 'office_address',
    },
    additionalBonuses: {
      type: Sequelize.TEXT,
      field: 'additional_bonuses',
    },
    projectAge: {
      type: Sequelize.INTEGER,
      field: 'project_age',
    },
    comments: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'created_at',
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'updated_at',
      defaultValue: Sequelize.fn('now'),
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('jobs'),
};
