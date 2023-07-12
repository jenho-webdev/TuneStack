// Require sequelize and deconstruct Model and DataTypes.
const { Model, DataTypes } = require('sequelize');
// Import connection to DB.
const sequelize = require('../config/connection');
// Album model will have all of the qualities of the Model object.
class Album extends Model {}
// Define model belonging to Album (Album schema). 
Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
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

module.exports = Album;