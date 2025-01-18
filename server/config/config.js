module.exports = {
  local: {
    username: "root",
    password: "root",
    database: "database",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging: false,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 10, // Maximum number of connection in pool
      min: 0, // Minimum number of connection in pool
      acquire: 30000, // Maximum time in ms to acquire a connection
      idle: 10000, // Maximum time in ms a connection can be idle before being released
    }
  },
  
};
