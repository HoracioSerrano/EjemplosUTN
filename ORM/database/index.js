const { Sequelize } = require("sequelize");
//                             "database", "user", "password"
const sequelize = new Sequelize("utn", "utn", "utn", {
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = { sequelize };
