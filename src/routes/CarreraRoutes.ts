import { Router } from 'express';
import { getAllCarrerasO, getAllCarrerasR, getCarreraO, getCarreraR } from '../controllers/CarreraController';

const router = Router();

router.get('/carrerasO/:unidad', getAllCarrerasO);
router.get('/carreraO/:unidad', getCarreraO);
router.get('/carrerasR/:unidad', getAllCarrerasR);
router.get('/carreraR/:unidad', getCarreraR);

export default router;
