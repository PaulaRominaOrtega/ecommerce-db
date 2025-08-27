const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Producto= require("./producto.model");

const Categoria = sequelize.define(
    "Categoria",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagenUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "categorias",
      timestamps: false,
    }
  );

  Categoria.hasMany(Producto, { 
    foreignKey: "idCategoria" });

module.exports = Categoria;