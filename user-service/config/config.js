module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "uCUgvKLTGhVRAYYiowbpIgsAwKeDwkUX",
    database: process.env.DB_NAME || "railway",
    host: process.env.DB_HOST || "shortline.proxy.rlwy.net",
    dialect: "postgres",
    port: process.env.DB_PORT || 39339,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      }
    }
  },
};
