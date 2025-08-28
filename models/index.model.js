const sequelize = require("../config/database");

const Producto = require("./producto.model");
const Categoria = require("./categoria.model");
const Administrador = require("./administrador.model");
const Carrito = require("./carrito.model");
const CarritoProducto = require("./carritoProducto.model");
const Cliente = require("./cliente.model");
const Direccion = require("./direccion.model");
const Envio = require("./envio.model");
const Pago = require("./pago.model");
const Pedido = require("./pedido.model");
const PedidoProducto = require("./pedidoProducto.model");
const Variante = require("./variante.model");
const CuponDescuento = require("./cuponDescuento.model");


Cliente.hasMany(Direccion, {
  foreignKey: "idCliente",
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

Cliente.hasOne(Carrito, {
  foreignKey: "idCliente",
  onDelete: "CASCADE",
});
Carrito.belongsTo(Cliente, {
  foreignKey: "idCliente",
});

Administrador.hasMany(Producto, {
  foreignKey: "idAdministrador",
});
Producto.belongsTo(Administrador, {
  foreignKey: "idAdministrador",
});

Categoria.hasMany(Producto, {
  foreignKey: "idCategoria",
});
Producto.belongsTo(Categoria, {
  foreignKey: "idCategoria",
});

Pedido.hasOne(Pago, {
  foreignKey: "idPedido",
  onDelete: "CASCADE",
});
Pago.belongsTo(Pedido, {
  foreignKey: "idPedido",
});

Pedido.hasOne(Envio, {
  foreignKey: "idPedido",
  onDelete: "CASCADE",
});

module.exports ={

  sequelize,
  Categoria,
  Administrador,
  Carrito,
  CarritoProducto,
  Cliente,
  Direccion,
  Envio,
  Pago,
  Pedido,
  PedidoProducto,
  Producto,
  CuponDescuento,
  Variante
  
};
