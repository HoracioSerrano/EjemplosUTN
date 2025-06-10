const { sequelize } = require("../database/index.js");
const { DataTypes } = require("sequelize");

const HorariosMaterias = sequelize.define("HorariosMaterias", {
  materiaId: {
    type: DataTypes.INTEGER,
  },
  horarioId: {
    type: DataTypes.INTEGER,
  },
  dia: {
    type: DataTypes.STRING,
  },
});

module.exports = { HorariosMaterias };
