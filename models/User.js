const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');   

// Check password against hashed password.
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
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]   // Minimum length of 8 characters
        }
    }
  },
  {
    hooks: {
        // Before create hook
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
