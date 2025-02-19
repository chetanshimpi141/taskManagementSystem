const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

class Task extends Model {}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    assigneeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assigneeEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  },
  {
    sequelize,
    modelName: 'task',
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Task;
