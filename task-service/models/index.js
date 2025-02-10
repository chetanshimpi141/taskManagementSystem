const sequelize = require("../config/database");
const Task = require("./Task.js");

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    await sequelize.sync({ alter: true }); // Use {force: true} to reset DB
    console.log("Database tables synced.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

module.exports = { Task, syncDB };
