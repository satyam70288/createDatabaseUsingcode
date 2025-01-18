const { Sequelize } = require('sequelize');  // Import Sequelize
const env = process.env.NODE_ENV ;  // Default to 'development' if NODE_ENV is not set
const config = require('../config/config')[env];
const db = {};

// Create a new Sequelize instance with the appropriate database credentials
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Authenticate the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Assign Sequelize instance and Sequelize class to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export db object for use in other parts of the application
module.exports = db;
