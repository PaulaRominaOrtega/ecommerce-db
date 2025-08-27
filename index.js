const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require('dotenv').config();

const { errorHandler, notFound } = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware de seguridad
app.use(helmet());

// Configuración de CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://tu-dominio.com'] 
        : ['http://localhost:5173', 'http://localhost:5174'],  // ['*']. para no filtrar ninguna IP
    credentials: true
}));

// Logging
app.use(morgan(process.env.NODE_ENV === 'development' ? "dev" : "combined"));

// Parsing de datos
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ruta de salud de la API
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Carga de rutas
const indexRoutes = require("./routes/index.routes");

app.use("/api", indexRoutes); 


// Middleware para rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// Inicializar base de datos
const { sequelize } = require("./models/index.model");

const initializeDatabase = async () => {
    try {
        
        await sequelize.authenticate();
        console.log("✅ Conexión a DB - OK");

    } catch (err) {
        console.error("❌ Error en DB:", err);
        process.exit(1);
    }
};

// Iniciar servidor
const startServer = async () => {
    await initializeDatabase();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor iniciado en el puerto: ${PORT}`);
        console.log(`📍 Salud de la API: http://localhost:${PORT}/health`);
        console.log(`📖 API: http://localhost:${PORT}/api`);
    
    });
};

startServer().catch(err => {
    console.error("❌ Error al iniciar el servidor:", err);
    process.exit(1);
});