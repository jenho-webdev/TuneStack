// Require sequelize and deconstruct Model and DataTypes.
const { Model, DataTypes } = require('sequelize');
// Import connection to DB.
const sequelize = require('../config/connection');

//use bcrypt to password hashing- uncomment below to use/test it
// const bcrypt = require('bcrypt');

// User model will have all of the qualities of the Model object.
class User extends Model {
  //uncomment below to make use of bcrypt
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
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
