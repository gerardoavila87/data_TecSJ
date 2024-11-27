import { Router } from 'express';
import * as matriculaController from '../controllers/FactMatriculaController';

const router = Router();

//router.get('/matricula', matriculaController.fetchMatriculaData);
router.get('/matricula/Real', matriculaController.getMatriculaUReal);
router.get('/matricula/Oficial', matriculaController.getMatriculaUOficial);
router.get('/matricula/Real/:unidad', matriculaController.getMatriculaR);
router.get('/matricula/Oficial/:unidad', matriculaController.getMatriculaO);

router.get('/matricula/Real/:unidad/:fechaInicio/:fechaFin', matriculaController.getMatriculaRF);
router.get('/matricula/Oficial/:unidad/:fechaInicio/:fechaFin', matriculaController.getMatriculaO);

router.get('/matricula/Real/:fechaInicio/:fechaFin', matriculaController.getMatriculaURealF);
router.get('/matricula/Oficial/:fechaInicio/:fechaFin', matriculaController.getMatriculaUOficialF);

router.get('/matricula/clase/:clase', matriculaController.getMatriculaURealClase);

router.get('/matricula/corte', matriculaController.getMatriculaURealCorte);

router.get('/matricula/total', matriculaController.getMatriculaURealTotal);

router.get('/matricula/periodo', matriculaController.getMatriculaPeriodo);

router.get('/matricula/estatus', matriculaController.getEstatusGeneral);

router.get('/matricula/semestre', matriculaController.getSemestreGeneral);

router.get('/matricula/variacion', matriculaController.getMatriculaVariacion);

router.get('/matricula/duplicados', matriculaController.getDuplicados);

export default router;
