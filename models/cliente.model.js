const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Direccion = require("./direccion.model");
const Pedido = require("./pedido.model");

const Cliente = sequelize.define(
    "Cliente",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      contrasena: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "clientes",
      timestamps: false,
    }
  );

  Cliente.hasMany(Direccion, {foreignKey: "idCliente",
  });
  Direccion.belongsTo(Cliente, {
    foreignKey: "idCliente",
  });
  
  Cliente.hasMany(Pedido, {
    foreignKey: "idCliente",
  });
  Pedido.belongsTo(Cliente, {
    foreignKey: "idCliente",
  });
  Cliente.hasOne (Carrito, {
    foreignKey: "idCliente",
    onDelete: "CASCADE"
  })


module.exports = Cliente;