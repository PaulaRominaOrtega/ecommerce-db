const express = require("express");
const router = express.Router();

const pedidosController = require("../../controllers/pedidos.controller");
const {
    validatePedidoCreate,
    validatePedidoUpdate,
    validatePedidoId,
    validatePagination
} = require("../../middleware/validation");

// GET /api/pedidos - Obtener todos los pedidos
router.get("/", validatePagination, pedidosController.getPedidos);

// GET /api/pedidos/:id - Obtener un pedido por ID
router.get("/:id", validatePedidoId, pedidosController.getPedido);

// POST /api/pedidos - Crear un nuevo pedido
router.post("/", validatePedidoCreate, pedidosController.createPedido);

// PUT /api/pedidos/:id - Actualizar un pedido
router.put("/:id", validatePedidoId, validatePedidoUpdate, pedidosController.updatePedido);

// DELETE /api/pedidos/:id - Eliminar un pedido (soft delete)
router.delete("/:id", validatePedidoId, pedidosController.deletePedido);

module.exports = router;
