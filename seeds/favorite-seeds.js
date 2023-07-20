// Require User model.
const { Favorite } = require('../models');

// Function to generate a random number between min and max (inclusive).
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Data to be seeded by bulk creation.
const favoriteData = [];

// Generate 30 data entries.
for (let i = 0; i < 30; i++) {
  favoriteData.push({
    user_id: getRandomNumber(1, 5), // Assuming user_ids are between 1 and 3.
    album_id: getRandomNumber(1, 20), // Assuming album_ids are between 1 and 5.
  });
}

// Function that will seed all data to the schema at once.
const seedFavorites = () => Favorite.bulkCreate(favoriteData);

// Export the function so that it can be used elsewhere.
module.exports = seedFavorites;
