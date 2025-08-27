const express = require("express");
const router = express.Router();

const mensajesController = require("../../controllers/mensajes.controller");
const {
    validateMensajeCreate,
    validateMensajeUpdate,
    validateMensajeId,
    validatePagination
} = require("../../middleware/validation");

// GET /api/mensajes - Obtener todos los mensajes (con paginación y filtro por productoId)
router.get("/", validatePagination, mensajesController.getMensajes);

// GET /api/mensajes/:id - Obtener un mensaje por ID
router.get("/:id", validateMensajeId, mensajesController.getMensaje);

// POST /api/mensajes - Crear un nuevo mensaje
router.post("/", validateMensajeCreate, mensajesController.createMensaje);

// PUT /api/mensajes/:id - Actualizar un mensaje
router.put("/:id", validateMensajeId, validateMensajeUpdate, mensajesController.updateMensaje);

// DELETE /api/mensajes/:id - Eliminar un mensaje
router.delete("/:id", validateMensajeId, mensajesController.deleteMensaje);

module.exports = router;
