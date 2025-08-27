// routes/carritosProductos.routes.js
const express = require("express");
const router = express.Router();
const carritosProductosController = require("../../controllers/carritosProductos.controller");
const { 
    validateCarritoProductoId, 
    validateCarritoProductoCreate, 
    validateCarritoProductoUpdate 
} = require("../../middleware/validation");

// GET /api/carritos-productos - Obtener todos los carritosProductos
router.get("/", carritosProductosController.getCarritosProductos);

// GET /api/carritos-productos/:id - Obtener un carritoProducto por ID
router.get("/:id", validateCarritoProductoId, carritosProductosController.getCarritoProductoById);

// POST /api/carritos-productos - Crear un nuevo carritoProducto
router.post("/", validateCarritoProductoCreate, carritosProductosController.createCarritoProducto);

// PUT /api/carritos-productos/:id - Actualizar un carritoProducto
router.put("/:id", validateCarritoProductoId, validateCarritoProductoUpdate, carritosProductosController.updateCarritoProducto);

// DELETE /api/carritos-productos/:id - Eliminar un carritoProducto
router.delete("/:id", validateCarritoProductoId, carritosProductosController.deleteCarritoProducto);

module.exports = router;