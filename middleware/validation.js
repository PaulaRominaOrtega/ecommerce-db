const { body, param, query } = require('express-validator');

// Validaciones para productos
const validateProductoCreate = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('precio')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número mayor o igual a 0'),
    body('stock')
        .isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero mayor o igual a 0'),
    body('categoriaId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID de categoría debe ser un número entero positivo'),
    body('descripcion')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('La descripción no puede exceder 1000 caracteres')
];

const validateProductoUpdate = [
    body('nombre')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('precio')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número mayor o igual a 0'),
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero mayor o igual a 0'),
    body('categoriaId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID de categoría debe ser un número entero positivo'),
    body('descripcion')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('La descripción no puede exceder 1000 caracteres')
];

const validateProductoId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El ID debe ser un número entero positivo')
];

// GET  localhost:3000/categorias?page=1&limit=10&activo=all&search=texto
const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La página debe ser un número entero positivo'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('El límite debe ser un número entre 1 y 100')
];

// Validaciones para usuarios
const validateUsuarioCreate = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('email')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .normalizeEmail(),
    body('rolId')
        .isInt({ min: 1 })
        .withMessage('El rol debe ser un número entero positivo')
];

// Validaciones para categorías
const validateCategoriaCreate = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('descripcion')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('La descripción no puede exceder 1000 caracteres')
];

const validateCategoriaUpdate = [
    body('nombre')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('descripcion')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('La descripción no puede exceder 1000 caracteres')
];

const validateCategoriaId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El ID debe ser un número entero positivo')
];

module.exports = {
    validateProductoCreate,
    validateProductoUpdate,
    validateProductoId,
    validatePagination,
    validateUsuarioCreate,
    validateCategoriaCreate,
    validateCategoriaUpdate,
    validateCategoriaId
};