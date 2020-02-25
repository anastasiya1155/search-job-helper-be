module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('interviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    startTime: {
      type: Sequelize.DATE,
      field: 'start_time',
    },
    endTime: {
      type: Sequelize.DATE,
      field: 'end_time',
    },
    location: {
      type: Sequelize.STRING,
    },
    jobId: {
      type: Sequelize.INTEGER,
      field: 'job_id',
      references: { model: 'jobs', key: 'id' },
    },
    type: {
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('interviews'),
};
