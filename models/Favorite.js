// Require sequelize and deconstruct Model and DataTypes.
const { Model, DataTypes } = require('sequelize');
// Import connection to DB.
const sequelize = require('../config/connection');
// Favorite model will have all of the qualities of the Model object.
class Favorite extends Model {}
// Define model belonging to Favorite (Favorite schema).
Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    album_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'album',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    // Sequelize adds two timestamp columns to table: createdAt and updatedAt
    timestamps: true,
    // use the model name as it is without any modification.
    freezeTableName: true,
    // convert the column names to snake_case
    underscored: true,
    modelName: 'album',
  }
);

module.exports = Favorite;
