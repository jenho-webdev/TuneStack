// Development only. Deployment requires different config

// Import Sequelize.
const Sequelize = require('sequelize');
// Import and require environment variables.
require('dotenv').config();
// Establish connection instance to db using Sequelize and mysql2 driver.
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    // Database to connect to. Database must exist.
    process.env.DB_NAME,
    // User connecting to db.
    process.env.DB_USER,
    // PW to access db.
    process.env.DB_PASSWORD,
    // Specifications regarding connection.
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      // need to define model first
      // timezone: 'America/New_York',
    }
  );
}
// Export connection so that it can be used by other parts of the application.
module.exports = sequelize;
