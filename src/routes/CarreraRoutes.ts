import { Router } from 'express';
import { getAllCarrerasO, getAllCarrerasR, getCarreraO, getCarreraR, getAllCarrerasReal } from '../controllers/CarreraController';

const router = Router();

router.get('/carreras/Oficial/:unidad', getAllCarrerasO);
router.get('/carrera/Oficial/:unidad', getCarreraO);
router.get('/carrera/:unidad', getAllCarrerasR);
router.get('/carreras/:unidad', getCarreraR);
router.get('/carrera/', getAllCarrerasReal);

export default router;
