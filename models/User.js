const { Model, DataTypes } = require('sequelize');

// Check password against hashed passwor

//Import bcrypt
const bcrypt = require('bcrypt');

// Import connection to DB.
const sequelize = require('../config/connection');

// User model will have all of the qualities of the Model object.
class User extends Model {
  // Check password against hashed password.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Define model belonging to user (User schema).\
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {

      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Minimum length of 8 characters
      },
    },
  },
  {
    hooks: {
      // Before create hook
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },

    sequelize,
    timestamps: false,
      
    // use the model name as it is without any modification.
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
