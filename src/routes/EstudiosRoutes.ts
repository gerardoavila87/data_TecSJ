import { Router } from 'express';
import * as EstudiosController from '../controllers/EstudiosController';

const router = Router();

router.get('/Estudios/', EstudiosController.getAllEstudios);
router.get('/Estudios/Oficial', EstudiosController.getEstudiosUO);
router.get('/Estudios/Real', EstudiosController.getEstudiosUR);
router.get('/Estudios/Oficial/:unidad', EstudiosController.getEstudiosUOC);
router.get('/Estudios/Real/:unidad', EstudiosController.getEstudiosURC);
router.get('/Estudios/Real/Carreras/:unidad', EstudiosController.getEstudiosURCarrera);

export default router;