import { Router } from 'express';
import * as captacionController from '../controllers/CaptacionController';

const router = Router();

router.get('/captacion/sincronizar', captacionController.fetchCaptacion);
router.get('/captacion/', captacionController.getAllCaptacion);
router.get('/captacion/unidad', captacionController.getCaptacionUnidad);

export default router;
