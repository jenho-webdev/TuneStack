// import models
const Album = require('./Album.js');
const User = require('./User.js');
const Favorite = require('./Favorite.js');


// Album belongsTo User
Album.belongsTo(User, {
  foreignKey: 'user_id',
});
// Users have many Albums
User.hasMany(Album, {
  foreignKey: 'user_id',
});

// // Users have many Favorites (User can have multiple favorites in the Favorites table.)
// User.hasMany(Favorite, {
//   foreignKey: 'user_id',
// });

// // Albums have many Favorites (Album can be favorited by multiple users in the Favorites table.)
// Album.hasMany(Favorite, {
//   foreignKey: 'album_id',
// });

// // Favorites belong to User (Each favorite in the Favorites table is associated with a specific user.)
// Favorite.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// // Favorites belong to Album (Each favorite in the Favorites table is associated with a specific album.)
// Favorite.belongsTo(Album, {
//   foreignKey: 'album_id',
// });

module.exports = {
  Album,
  User,
  Favorite,
};