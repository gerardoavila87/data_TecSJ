import { Router } from 'express';
import { getAllCarrerasO, getAllCarrerasR, getCarreraO, getCarreraR, getAllCarrerasReal } from '../controllers/CarreraController';

const router = Router();

router.get('/carreras/Oficial/:unidad', getAllCarrerasO);
router.get('/carrera/Oficial/:unidad', getCarreraO);
router.get('/carreras/Real/:unidad', getAllCarrerasR);
router.get('/carrera/Real/:unidad', getCarreraR);
router.get('/carreras/Real', getAllCarrerasReal);

export default router;
