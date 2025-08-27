const express = require("express");
const router = express.Router();

const cuponesController = require("../../controllers/cuponesDescuentos.controller");
const {
    validateCuponCreate,
    validateCuponUpdate,
    validateCuponId,
    validatePagination
} = require("../../middleware/validation");

// GET /api/cupones - Obtener todos los cupones con paginación y filtro activos
router.get("/", validatePagination, cuponesController.getCupones);

// GET /api/cupones/:id - Obtener un cupón por ID
router.get("/:id", validateCuponId, cuponesController.getCupon);

// POST /api/cupones - Crear un nuevo cupón
router.post("/", validateCuponCreate, cuponesController.createCupon);

// PUT /api/cupones/:id - Actualizar un cupón
router.put("/:id", validateCuponId, validateCuponUpdate, cuponesController.updateCupon);

// DELETE /api/cupones/:id - Desactivar un cupón (soft delete)
router.delete("/:id", validateCuponId, cuponesController.deleteCupon);

module.exports = router;
