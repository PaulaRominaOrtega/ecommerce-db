const express = require("express");
const router = express.Router();

const pedidosProductosController = require("../../controllers/pedidosProductos.controller");
const {
    validatePedidoProductoCreate,
    validatePedidoProductoUpdate,
    validatePedidoProductoId,
    validatePagination
} = require("../../middleware/validation");

// GET /api/pedidos-productos - Obtener todos los pedidos-productos
router.get("/", validatePagination, pedidosProductosController.getPedidosProductos);

// GET /api/pedidos-productos/:id - Obtener un pedido-producto por ID
router.get("/:id", validatePedidoProductoId, pedidosProductosController.getPedidoProducto);

// POST /api/pedidos-productos - Crear un nuevo pedido-producto
router.post("/", validatePedidoProductoCreate, pedidosProductosController.createPedidoProducto);

// PUT /api/pedidos-productos/:id - Actualizar un pedido-producto
router.put("/:id", validatePedidoProductoId, validatePedidoProductoUpdate, pedidosProductosController.updatePedidoProducto);

// DELETE /api/pedidos-productos/:id - Eliminar un pedido-producto
router.delete("/:id", validatePedidoProductoId, pedidosProductosController.deletePedidoProducto);

module.exports = router;
