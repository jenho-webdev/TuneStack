// import models
const Album = require('./Album.js');
const User = require('./User.js');
const Favorite = require('./Favorite.js');

// Users can create many album entries (user-id inseted into Album table)
User.hasMany(Album, {
// Specify the foreign key column name explicitly.
  foreignKey: 'user_id', 
});
// Album belongsTo User (Important to create both associations to call methods from either side.)
Album.belongsTo(User, {
  foreignKey: 'user_id',
});

// Users can have many favorites (insert user_id column into favorite table)
User.hasMany(Favorite);
// Each favorite belongs to one user because it signifies a unique association between a user and an album) 
Favorite.belongsTo(User, {
  foreignKey: 'user_id',
})

// Albums can have many favorites (insert album_id column into favorite table)
Album.hasMany(Favorite);
// Each favorite belongs to one album because it signifies a unique association between an album and user) 
Favorite.belongsTo(Album, {
  foreignKey: 'album_id',
})

module.exports = {
  Album,
  User,
  Favorite,
};
