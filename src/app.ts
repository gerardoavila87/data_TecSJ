import express from 'express';
import cors from 'cors';  // Importa el paquete cors
import { connectDB } from './database/connection';
import FactMatriculaRoutes from './routes/FactMatriculaRoutes';
import UnidadRoutes from './routes/UnidadRoutes';
import CarreraRoutes from './routes/CarreraRoutes';
import DiscapacidadRoutes from './routes/DiscapacidadRoutes';
import EstudiosRoutes from './routes/EstudiosRoutes';
import ModalidadesRoutes from './routes/modalidadRoutes';
import ProcedenciaRoutes from './routes/procedenciaRoutes';
import EstudiantesRoutes from './routes/estudiantesRoutes';
import FechasRoutes from './routes/FechasRoutes';
import captacionRoutes from './routes/CaptacionRoutes';

const app = express();
connectDB();

// Configuración de CORS

// Configuración de CORS
app.use(cors());  // Permite todas las solicitudes desde cualquier origen

app.use(express.json());  


// Rutas
app.use('/api', FactMatriculaRoutes);
app.use('/api', UnidadRoutes);
app.use('/api', CarreraRoutes);
app.use('/api', DiscapacidadRoutes);
app.use('/api', EstudiosRoutes);
app.use('/api', ModalidadesRoutes);
app.use('/api', ProcedenciaRoutes);
app.use('/api', EstudiantesRoutes);
app.use('/api', FechasRoutes);
app.use('/api', captacionRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
