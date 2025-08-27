const express = require("express");
const router = express.Router();

const varianteController = require("../../controllers/variantes.controller");
const {
    validateVarianteCreate,
    validateVarianteUpdate,
    validateVarianteId,
    validatePagination
} = require("../../middleware/validation");

// GET /api/variantes - Obtener todas las variantes
router.get("/", validatePagination, varianteController.getVariantes);

// GET /api/variantes/:id - Obtener una variante por ID
router.get("/:id", validateVarianteId, varianteController.getVariante);

// POST /api/variantes - Crear una nueva variante
router.post("/", validateVarianteCreate, varianteController.createVariante);

// PUT /api/variantes/:id - Actualizar una variante
router.put("/:id", validateVarianteId, validateVarianteUpdate, varianteController.updateVariante);

// DELETE /api/variantes/:id - Eliminar una variante
router.delete("/:id", validateVarianteId, varianteController.deleteVariante);

module.exports = router;
