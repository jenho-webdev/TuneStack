const path = require('path');
// Import Express.
const express = require('express');

// import models (Can move imports to controllers when made)
const models = require('./models/index.js');

// Import connection to db via Sequelize and mysql2 driver.
const sequelize = require('./config/connection.js');

// Import controller routes
const routes = require('./controllers');
//Import helpers
const helpers = require('./utils/helpers');

// Create new instance of express.
const app = express();
// Set post where server will listen.
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
};
app.use(session(sess));

const hbs = exphbs.create({ helpers });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Implement Sequlize to sync models to databse and start server. Not syncing yet but needed for connection
sequelize.sync({ force: false }).then(() => {
  // Set up server at specified port
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
