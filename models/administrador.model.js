const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Producto = require("./producto.model");

const Administrador = sequelize.define('Administrador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  activa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'administradores',
  timestamps: false
});

Administrador.hasMany(Producto, { 
  foreignKey: "idAdministrador" });

module.exports = Administrador;
