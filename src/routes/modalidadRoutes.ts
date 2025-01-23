import { Router } from 'express';
import * as modalidadController from '../controllers/ModalidadController';

const router = Router();

router.get('/modalidades', modalidadController.getAllModalidades);

//router.get('/modalidades/Real/unidad/:unidad?/fecha/:fechaInicio?/:fechaFin?', modalidadController.getModalidades);

export default router;
