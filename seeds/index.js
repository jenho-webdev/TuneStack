// Import functions for seeding each schema in db.
const seedUsers = require('./user-seeds');
const seedAlbums = require('./album-seeds');
const seedFavorites = require('./favorite-seeds');
// Import db connection
const sequelize = require('../config/connection');
// Drop tables, remake, and call on seeding functions one after the other.
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n______DATABASE SYNCED______\n');
  await seedUsers();
  console.log('\n______USERS SYNCED______\n');
  await seedAlbums();
  console.log('\n______ALBUMS SYNCED______\n');
  await seedFavorites();
  console.log('\n______FAVORITES SYNCED______\n');
// Exit node shell.
  process.exit(0);
};
// Execute function when node executes on this file.
seedAll();