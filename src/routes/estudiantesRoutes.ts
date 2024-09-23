import { Router } from 'express';
import * as estudiantesController from '../controllers/EstudiantesController';

const router = Router();

router.get('/estudiantes/:tipo', estudiantesController.getEstudiantes);

export default router;
