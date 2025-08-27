const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Producto= require("./producto.model");
const Cliente= require("./cliente.model");

const Carrito = sequelize.define(
    "Carrito",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "clientes",
          key: "id",
        },
      },
    },
    {
      tableName: "carritos",
      timestamps: false,
    }
  );

Cliente.hasOne(Carrito, {foreignKey: "idCliente",onDelete: "CASCADE",});
Carrito.belongsTo(Cliente, {foreignKey: "idCliente",});  

Carrito.belongsToMany(Producto, {
    through: CarritoProducto,
    foreignKey: "idCarrito",
    otherKey: "idProducto",
  });
  Producto.belongsToMany(Carrito, {
    through: CarritoProducto,
    foreignKey: "idProducto",
    otherKey: "idCarrito",
  });
  Carrito.belongsTo(Cliente, { 
    foreignKey: "idCliente" });
  Carrito.belongsToMany(Producto, {
    through: CarritoProducto,
    foreignKey: "idCarrito",
    otherKey: "idProducto",
  });
  
module.exports = Carrito;