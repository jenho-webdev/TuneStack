// import models (Can move imports to controllers when made)
const models = require('./models/index.js');
// Import Express.
const express = require('express');
// Import connection to db via Sequelize and mysql2 driver.
const sequelize = require('./config/connection.js');
// Import express-handlebars.
const exphbs = require('express-handlebars');
// Import path module.
const path = require('path');
// Import Router
const router = require('./routes/router');

// Create new instance of express.
const app = express();

// Set post where server will listen.
const PORT = process.env.PORT || 3001;

// Set up handlebars
const hbs = exphbs.create({
  extname: 'hbs',
  partialsDir: path.join(__dirname, 'views', 'partials')
});
app
  .engine('hbs', hbs.engine)
  .set('view engine', 'hbs')
  .set('views', path.join(__dirname, "views"))
  .use(express.static(path.join(__dirname,"public"))); // Set static folder for express

// Set up middleware
app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(router);

// Implement Sequlize to sync models to database and start server. Not syncing yet but needed for connection
sequelize.sync({ force: false }).then(() => {
  // Set up server at specified port
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});