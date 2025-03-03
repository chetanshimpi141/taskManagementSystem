'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task',
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
      })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('task');
  }
};