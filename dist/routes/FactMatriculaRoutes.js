"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matriculaController = __importStar(require("../controllers/FactMatriculaController"));
const router = (0, express_1.Router)();
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
exports.default = router;
