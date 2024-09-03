import { Router } from 'express';
import { fetchMatriculaData, getMatriculaUOficial, getMatriculaUReal, getMatriculaR, getMatriculaO } from '../controllers/FactMatriculaController';

const router = Router();

router.get('/matricula', fetchMatriculaData);
router.get('/matriculaUReal', getMatriculaUReal);
router.get('/matriculaUOficial', getMatriculaUOficial);
router.get('/matricular/:unidad', getMatriculaR);
router.get('/matriculao/:unidad', getMatriculaO);

export default router;
