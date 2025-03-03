const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
      field: 'assignee_email'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'task',
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Task;