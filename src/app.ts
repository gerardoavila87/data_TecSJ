import express from 'express';
import fs from 'fs';
import https from 'https';
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

const PORT: number = parseInt( process.env.PORT as string );
const app = express();
connectDB();

// Configuración de CORS

// Configuración de CORS
app.use(express.json());  
app.use(( req, res, next ) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, api_key, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
  next();
});
if ( process.env.NODE_ENV === 'dev' ) {
  app.listen( PORT , () => {});
}else{
  const privateKey  = fs.readFileSync( process.env.SSL_KEY as string, 'utf8');
  const certificate = fs.readFileSync( process.env.SSL_CERT as string, 'utf8');
  const ca = fs.readFileSync( process.env.SSL_CA as string, 'utf8' );
  const credentials = { key: privateKey, ca: ca, cert: certificate };
  const app_ssl = https.createServer( credentials, app );
  app_ssl.listen( PORT, () => { console.log('entro a https:') } );
}


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

