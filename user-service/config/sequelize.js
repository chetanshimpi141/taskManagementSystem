const { Sequelize } = require('sequelize');
const config = require("../../config/config");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

console.log(process.env.DB_NAME)
// Set up Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  'postgres',
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  },
);

module.exports = { sequelize };
