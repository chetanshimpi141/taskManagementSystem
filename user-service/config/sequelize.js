const { Sequelize } = require('sequelize');
const config = require("../../config/config");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

console.log(dbConfig.password)
// Set up Sequelize connection
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  String(dbConfig.password) ||"postgres",
  {
    host: dbConfig.host,
    dialect: 'postgres',
    port: dbConfig.port,
  },
);

module.exports = { sequelize };
