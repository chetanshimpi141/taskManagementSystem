const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const { sequelize } = require('./config/sequelize');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

// Sequelize models with DB
sequelize.sync()
  .then(() => {
    console.log('Database synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });


const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Task Service running on port ${PORT}`));
