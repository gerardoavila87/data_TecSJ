import { Router } from 'express';
import { getAllUnidadO, getAllUnidadR } from '../controllers/UnidadController';

const router = Router();

router.get('/unidades/Oficial', getAllUnidadO);
router.get('/Unidades/Real', getAllUnidadR);

export default router;
