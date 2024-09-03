import { Router } from 'express';
import { getAllUnidadO, getAllUnidadR } from '../controllers/UnidadController';

const router = Router();

router.get('/unidadesO', getAllUnidadO);
router.get('/UnidadesR', getAllUnidadR);

export default router;
