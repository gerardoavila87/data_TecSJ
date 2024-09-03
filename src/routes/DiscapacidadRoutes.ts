import { Router } from 'express';
import { getAllDiscapacidades, getDiscapacidadesU, getDiscapacidadesC } from '../controllers/DiscapacidadController';

const router = Router();

router.get('/Discapacidades/', getAllDiscapacidades);
router.get('/Discapacidades/:unidad', getDiscapacidadesU);
router.get('/Discapacidades/:unidad/carrera/:carrera', getDiscapacidadesC);

export default router;
