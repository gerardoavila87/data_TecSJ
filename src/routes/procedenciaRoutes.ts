import { Router } from 'express';
import * as prcedenciaController from '../controllers/ProcedenciaController';

const router = Router();

router.get('/procedencias', prcedenciaController.getAllProcedencias);

router.get('/procedencias/Real/unidad/:unidad?/fecha/:fechaInicio?/:fechaFin?', prcedenciaController.getProcedencias);

export default router;
