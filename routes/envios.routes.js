const express = require("express");
const router = express.Router();

const enviosController = require("../../controllers/envios.controller");
const {
    validateEnvioCreate,
    validateEnvioUpdate,
    validateEnvioId,
    validatePagination
} = require("../../middleware/validation");

// GET /api/envios - Obtener todos los envíos (con paginación y filtro por estado)
router.get("/", validatePagination, enviosController.getEnvios);

// GET /api/envios/:id - Obtener un envío por ID
router.get("/:id", validateEnvioId, enviosController.getEnvio);

// POST /api/envios - Crear un nuevo envío
router.post("/", validateEnvioCreate, enviosController.createEnvio);

// PUT /api/envios/:id - Actualizar un envío
router.put("/:id", validateEnvioId, validateEnvioUpdate, enviosController.updateEnvio);

// DELETE /api/envios/:id - Marcar un envío como inactivo (soft delete)
router.delete("/:id", validateEnvioId, enviosController.deleteEnvio);

module.exports = router;
