const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const { sequelize } = require('./config/sequelize');
require('dotenv').config();

const app = express();
const dbPort = process.env.DB_PORT;
// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Set up routes
app.use('/api/auth', authRoutes);

// Synchronize Sequelize models with DB
sequelize.sync()
  .then(() => {
    console.log('Database synced!');
    console.log(`User Database Service running on port ${dbPort}`);
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Start server
const PORT = process.env.USER_SERVICE_PORT || 4001;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
