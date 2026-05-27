const { sequelize } = require("../database/index.js");
const { DataTypes } = require("sequelize");

const Horarios = sequelize.define("Horarios", {
  ingreso: {
    type: DataTypes.STRING,
  },
  egreso: {
    type: DataTypes.STRING,
  },
});

module.exports = { Horarios };
