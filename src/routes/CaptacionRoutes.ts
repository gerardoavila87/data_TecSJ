import { Router } from 'express';
import * as captacionController from '../controllers/CaptacionController';

const router = Router();

router.get('/captacion/:filtro', captacionController.getAllCaptacion);

export default router;
