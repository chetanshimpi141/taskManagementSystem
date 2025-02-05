module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "task_management",
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "task_management_db_test",
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "task_management_db_prod",
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  },
};
