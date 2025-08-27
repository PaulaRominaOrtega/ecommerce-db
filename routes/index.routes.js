const express = require("express");
const router = express.Router();

// Rutas de productos
const productosRoutes = require("./productos.routes");
router.use("/productos", productosRoutes);

// Rutas de categorías
const categoriasRoutes = require("./categorias.routes");
router.use("/categorias", categoriasRoutes);

// Rutas de usuarios
const usuariosRoutes = require("./usuarios.routes");
router.use("/usuarios", usuariosRoutes);

// Rutas de roles
const rolesRoutes = require("./roles.routes");
router.use("/roles", rolesRoutes);

// Rutas de autenticación
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

module.exports = router;