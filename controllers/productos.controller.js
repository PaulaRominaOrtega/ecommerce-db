const { Producto, CategoriaModel, AdministradorModel } = require("../models/index.model");
const { validationResult } = require('express-validator');

// Obtener todos los productos
const getProductos = async (req, res) => {
    try {
        console.log("GET /productos ");

        const { page = 1, limit = 10, idCategoria, oferta = undefined } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};
        if (idCategoria) whereClause.idCategoria = idCategoria;
        if (oferta !== undefined) whereClause.oferta = oferta === 'true';

        const productos = await Producto.findAndCountAll({
            where: whereClause,
            include: [
                { model: CategoriaModel, as: 'categoria', attributes: ['id', 'nombre'] },
                { model: AdministradorModel, as: 'administrador', attributes: ['id', 'nombre'] }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id', 'DESC']]
        });

        res.json({
            success: true,
            data: productos.rows,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(productos.count / limit),
                totalItems: productos.count,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (err) {
        console.error("Error en getProductos:", err);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor",
            message: "No se pudieron obtener los productos"
        });
    }
};

// Obtener un producto por ID
const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("GET /productos/:id", { id });

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "ID de producto inválido"
            });
        }

        const producto = await Producto.findByPk(id, {
            include: [
                { model: CategoriaModel, as: 'categoria', attributes: ['id', 'nombre'] },
                { model: AdministradorModel, as: 'administrador', attributes: ['id', 'nombre'] }
            ]
        });

        if (!producto) {
            return res.status(404).json({
                success: false,
                error: "Producto no encontrado"
            });
        }

        res.json({
            success: true,
            data: producto
        });
    } catch (err) {
        console.error("Error en getProducto:", err);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor",
            message: "No se pudo obtener el producto"
        });
    }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: "Datos de entrada inválidos",
                details: errors.array()
            });
        }

        const { nombre, precio, descripcion, stock, imagen, oferta, descuento, idAdministrador, idCategoria } = req.body;

        const nuevoProducto = await Producto.create({
            nombre,
            precio,
            descripcion,
            stock,
            imagen,
            oferta,
            descuento,
            idAdministrador,
            idCategoria
        });

        res.status(201).json({
            success: true,
            data: nuevoProducto,
            message: "Producto creado exitosamente"
        });
    } catch (err) {
        console.error("Error en createProducto:", err);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor",
            message: "No se pudo crear el producto"
        });
    }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: "Datos de entrada inválidos",
                details: errors.array()
            });
        }

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({
                success: false,
                error: "Producto no encontrado"
            });
        }

        await producto.update(req.body);

        res.json({
            success: true,
            data: producto,
            message: "Producto actualizado exitosamente"
        });
    } catch (err) {
        console.error("Error en updateProducto:", err);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor",
            message: "No se pudo actualizar el producto"
        });
    }
};

// Eliminar un producto (soft delete usando 'activo', si lo agregás al modelo)
const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({
                success: false,
                error: "Producto no encontrado"
            });
        }

        // Soft delete (si agregás 'activo' al modelo)
        // await producto.update({ activo: false });

        // Si no hay soft delete definido, usar destroy físico
        await producto.destroy();

        res.json({
            success: true,
            message: "Producto eliminado exitosamente"
        });
    } catch (err) {
        console.error("Error en deleteProducto:", err);
        res.status(500).json({
            success: false,
            error: "Error interno del servidor",
            message: "No se pudo eliminar el producto"
        });
    }
};

module.exports = {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
};
