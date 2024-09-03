import express from 'express';
import { connectDB } from './database/connection';
import FactMatriculaRoutes from './routes/FactMatriculaRoutes';
import UnidadRoutes from './routes/UnidadRoutes';
import CarreraRoutes from './routes/CarreraRoutes';


const app = express();
connectDB();
app.use(express.json());  // Asegúrate de que el cuerpo de la solicitud se pueda parsear como JSON
app.use('/api', FactMatriculaRoutes);  
app.use('/api', UnidadRoutes);  
app.use('/api', CarreraRoutes);  

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
