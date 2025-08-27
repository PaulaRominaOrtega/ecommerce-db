const express = require("express");
const router = express.Router();

const pagosController = require("../../controllers/pagos.controller");
const {
    validatePagoCreate,
    validatePagoUpdate,
    validatePagoId,
    validatePagination
} = require("../../middleware/validation");

// GET /api/pagos - Obtener todos los pagos
router.get("/", validatePagination, pagosController.getPagos);

// GET /api/pagos/:id - Obtener un pago por ID
router.get("/:id", validatePagoId, pagosController.getPago);

// POST /api/pagos - Crear un nuevo pago
router.post("/", validatePagoCreate, pagosController.createPago);

// PUT /api/pagos/:id - Actualizar un pago
router.put("/:id", validatePagoId, validatePagoUpdate, pagosController.updatePago);

// DELETE /api/pagos/:id - Eliminar un pago (soft delete)
router.delete("/:id", validatePagoId, pagosController.deletePago);

module.exports = router;
