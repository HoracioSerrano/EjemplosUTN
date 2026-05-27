const { sequelize } = require("../database/index.js");
const { DataTypes } = require("sequelize");

const PerfilUTN = sequelize.define("Perfil", {
  carrera: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaIngreso: {
    type: DataTypes.STRING,
  },
  legajo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

module.exports = { PerfilUTN };
