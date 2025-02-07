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
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      },
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
        // Hash the role before storing it in the DB
        const salt1 = await bcrypt.genSalt(10);
        user.role = await bcrypt.hash(user.role, salt1);
      },
    },
  }
);

User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare hashed passwords
};

User.prototype.compareRole = async function (role) {
  return bcrypt.compare(role, this.role); // Compare hashed role
};

module.exports = User;
