import { Router } from 'express';
import * as fechasController from '../controllers/FechasController';

const router = Router();

router.get('/fechas/:periodo', fechasController.getAllFechas);
router.get('/periodo', fechasController.getPeriodo);

export default router;
