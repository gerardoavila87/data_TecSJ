import { Router } from 'express';
import * as fechasController from '../controllers/FechasController';

const router = Router();

router.get('/fechas/:periodo', fechasController.getAllFechas);
router.get('/periodo', fechasController.getPeriodo);
router.get('/fecha', fechasController.getFecha);
router.get('/date', fechasController.getDate);
router.get('/captacionfin', fechasController.getLast);

router.get('/periodos', fechasController.getPeriodos);


export default router;
