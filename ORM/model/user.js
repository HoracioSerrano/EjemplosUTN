const { sequelize } = require("../database/index.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 50],
    },
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  edad: {
    type: DataTypes.INTEGER,
    validate: {
      min: 18,
      max: 99,
    },
  },
});

module.exports = { User };
