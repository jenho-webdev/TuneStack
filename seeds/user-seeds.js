// Require User model.
const { User } = require('../models');
// Data to be seeded by bulk creation.
const userData = [
    {
      username: 'rockstar89',
      password: 'Guitarist123',
    },
    {
      username: 'musiclover42',
      password: 'Melody2022',
    },
    {
      username: 'rhythmqueen',
      password: 'GrooveMaster!',
    },
    {
      username: 'harmonicat',
      password: 'BluesyNotes99',
    },
    {
      username: 'songbird22',
      password: 'VocalPower123',
    },
  ];
// Function that will seed all data to schema at once.
const seedUsers = () => User.bulkCreate(userData);
// Export function so that it can be used elsewhere.
module.exports = seedUsers;