import { Router } from 'express';
import * as captacionController from '../controllers/CaptacionController';

const router = Router();

router.get('/captacion/:filtro', captacionController.getAllCaptacion);
router.get('/captacionT/', captacionController.getCaptacionTotal);
router.get('/captacionP/', captacionController.getMaxPeriodo);
router.get('/captacionD/', captacionController.getCaptacionFecha);




export default router;
