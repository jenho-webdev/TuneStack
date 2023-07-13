// import models (Can move imports to controllers when made)
const models = require('./models/index.js');
// Import Express.
const express = require('express');
// Import connection to db via Sequelize and mysql2 driver.
const sequelize = require('./config/connection.js');

// Create new instance of express.
const app = express();
// Set post where server will listen.
const PORT = process.env.PORT || 3001;



// Implement Sequlize to sync models to databse and start server. Not syncing yet but needed for connection
sequelize.sync({ force: false }).then(() => {
  // Set up server at specified port
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});