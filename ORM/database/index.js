const { Sequelize } = require("sequelize");
//                             "database", "user", "password"
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };
