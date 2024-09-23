import { Router } from 'express';
import * as fechasController from '../controllers/FechasController';

const router = Router();

router.get('/fechas/:periodo', fechasController.getAllFechas);

export default router;
