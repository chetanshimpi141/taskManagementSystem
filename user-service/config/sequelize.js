const { Sequelize } = require('sequelize');
const config = require("./config");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

// Set up Sequelize connection
const sequelize = new Sequelize(
  'railway',
  dbConfig.username,
  String(dbConfig.password) ||"uCUgvKLTGhVRAYYiowbpIgsAwKeDwkUX",

  {
    host: dbConfig.host,
    dialect: 'postgres',
    port: dbConfig.port,
  },
);

module.exports = { sequelize };
