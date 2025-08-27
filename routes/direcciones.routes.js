const express = require("express");
const router = express.Router();

const direccionesController = require("../../controllers/direcciones.controller");
const {
    validateDireccionCreate,
    validateDireccionUpdate,
    validateDireccionId,
    validatePagination
} = require("../../middleware/validation");

// GET /api/direcciones - Obtener todas las direcciones (con paginación y filtro por idCliente)
router.get("/", validatePagination, direccionesController.getDirecciones);

// GET /api/direcciones/:id - Obtener una dirección por ID
router.get("/:id", validateDireccionId, direccionesController.getDireccion);

// POST /api/direcciones - Crear una nueva dirección
router.post("/", validateDireccionCreate, direccionesController.createDireccion);

// PUT /api/direcciones/:id - Actualizar una dirección
router.put("/:id", validateDireccionId, validateDireccionUpdate, direccionesController.updateDireccion);

// DELETE /api/direcciones/:id - Eliminar una dirección (hard delete)
router.delete("/:id", validateDireccionId, direccionesController.deleteDireccion);

module.exports = router;
