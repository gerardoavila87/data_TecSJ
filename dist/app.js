"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const FactMatriculaRoutes_1 = __importDefault(require("./routes/FactMatriculaRoutes"));
const UnidadRoutes_1 = __importDefault(require("./routes/UnidadRoutes"));
const CarreraRoutes_1 = __importDefault(require("./routes/CarreraRoutes"));
const DiscapacidadRoutes_1 = __importDefault(require("./routes/DiscapacidadRoutes"));
const EstudiosRoutes_1 = __importDefault(require("./routes/EstudiosRoutes"));
const modalidadRoutes_1 = __importDefault(require("./routes/modalidadRoutes"));
const procedenciaRoutes_1 = __importDefault(require("./routes/procedenciaRoutes"));
const estudiantesRoutes_1 = __importDefault(require("./routes/estudiantesRoutes"));
const FechasRoutes_1 = __importDefault(require("./routes/FechasRoutes"));
const app = (0, express_1.default)();
(0, connection_1.connectDB)();
app.use(express_1.default.json()); // Asegúrate de que el cuerpo de la solicitud se pueda parsear como JSON
app.use('/api', FactMatriculaRoutes_1.default);
app.use('/api', UnidadRoutes_1.default);
app.use('/api', CarreraRoutes_1.default);
app.use('/api', DiscapacidadRoutes_1.default);
app.use('/api', EstudiosRoutes_1.default);
app.use('/api', modalidadRoutes_1.default);
app.use('/api', procedenciaRoutes_1.default);
app.use('/api', estudiantesRoutes_1.default);
app.use('/api', FechasRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is running...');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
