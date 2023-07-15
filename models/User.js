// Require sequelize and deconstruct Model and DataTypes.
const { Model, DataTypes } = require('sequelize');

//Import bcrypt
const bcrypt = require('bcrypt');

// Import connection to DB.
const sequelize = require('../config/connection');
// User model will have all of the qualities of the Model object.

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// Define model belonging to user (User schema).
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    sequelize,
    timestamps: false,
    // use the model name as it is without any modification.
    freezeTableName: true,
    // convert the column names to snake_case
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
