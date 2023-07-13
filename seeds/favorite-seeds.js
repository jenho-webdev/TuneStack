// Require User model.
const { Favorite } = require('../models');
// Data to be seeded by bulk creation.
const favoriteData = [
    {
      user_id: 1,
      album_id: 2,
    },
    {
      user_id: 1,
      album_id: 5,
    },
    {
      user_id: 2,
      album_id: 3,
    },
    {
      user_id: 3,
      album_id: 1,
    },
    {
      user_id: 3,
      album_id: 4,
    },
  ];
// Function that will seed all data to schema at once.
const seedFavorites = () => Favorite.bulkCreate(favoriteData);
// Export function so that it can be used elsewhere.
module.exports = seedFavorites;