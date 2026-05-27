const { sequelize } = require("../database/index.js");
const { DataTypes } = require("sequelize");

const Materias = sequelize.define("Materias", {
  catedra: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profesor: {
    type: DataTypes.STRING,
  },
  cargaHoraria: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { Materias };
