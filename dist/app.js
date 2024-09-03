"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const FactMatriculaRoutes_1 = __importDefault(require("./routes/FactMatriculaRoutes")); // Importa las rutas
const app = (0, express_1.default)();
(0, connection_1.connectDB)();
app.use(express_1.default.json()); // Asegúrate de que el cuerpo de la solicitud se pueda parsear como JSON
app.use('/api', FactMatriculaRoutes_1.default); // Usa las rutas bajo el prefijo '/api'
app.get('/', (req, res) => {
    res.send('API is running...');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
