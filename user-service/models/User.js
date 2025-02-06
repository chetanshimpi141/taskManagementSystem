const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/sequelize');
class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,  // assuming you have sequelize configured elsewhere
    modelName: 'task_management',
    freezeTableName:true,
    hooks: {
      beforeCreate: async (user) => {
        // Hash the password before storing it in the DB
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare hashed passwords
};

module.exports = User;
