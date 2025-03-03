module.exports = {
  development: {
    username: "postgres",
    password: "uCUgvKLTGhVRAYYiowbpIgsAwKeDwkUX",
    database: "railway",
    host: "shortline.proxy.rlwy.net",
    dialect: "postgres",
    port: 39339,
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
