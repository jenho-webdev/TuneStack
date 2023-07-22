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
// Import express-session
const session = require('express-session');
//Import dotenv
require('dotenv').config();

// Create new instance of express.
const app = express();

// Set post where server will listen.
const PORT = process.env.PORT || 3001;

// Set up session with cookies
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 864000000, // 864,000,000 milliseconds = 10 days
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  //saveUninitialized is set to false to not save uninitialized session into DB session table.
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
    expiration: 864000000, // 864,000,000 milliseconds = 10 days
  }),
};
app.use(session(sess));

// Set up handlebars
const hbs = exphbs.create({
  extname: 'hbs',
  partialsDir: path.join(__dirname, 'views', 'partials'),
});
app
  .set('view engine', 'hbs')
  .set('views', path.join(__dirname, 'views'))
  .engine('hbs', hbs.engine)
  .use(express.static(path.join(__dirname, 'public')))
  .use('/handlers', express.static(path.join(__dirname, 'handlers')));

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
