const sequelize = require("../config/database");

const ProductoModel = require("./producto.model");
const CategoriaModel = require("./categoria.model");

// Establecer relaciones
// Un producto pertenece a una categoría
ProductoModel.belongsTo(CategoriaModel, {
    foreignKey: 'categoriaId',
    as: 'categoria'
});

// Una categoría tiene muchos productos
CategoriaModel.hasMany(ProductoModel, {
    foreignKey: 'categoriaId',
    as: 'productos'
});

module.exports = {
    sequelize,
    ProductoModel,
    CategoriaModel
}