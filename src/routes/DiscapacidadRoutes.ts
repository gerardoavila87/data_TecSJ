import { Router } from 'express';
import * as DiscapacidadController from '../controllers/DiscapacidadController';

const router = Router();

router.get('/Discapacidades/', DiscapacidadController.getAllDiscapacidades);
router.get('/Discapacidades/Oficial', DiscapacidadController.getDiscapacidadesUO);
router.get('/Discapacidades/Real', DiscapacidadController.getDiscapacidadesUR);
router.get('/Discapacidades/Oficial/:unidad', DiscapacidadController.getDiscapacidadesUOC);

export default router;