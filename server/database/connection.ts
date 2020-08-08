const {Sequelize} = require('sequelize');

console.log(
  process.env.DB_DATABASE,
  process.env.DB_HOST,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
);

export default new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
