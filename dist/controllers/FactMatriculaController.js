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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatriculaPeriodo = exports.getMatriculaURealTotal = exports.getMatriculaURealCorte = exports.getSemestreGeneral = exports.getEstatusGeneral = exports.getMatriculaURealClase = exports.getMatriculaRF = exports.getMatriculaR = exports.getMatriculaO = exports.getMatriculaUOficial = exports.getMatriculaUReal = exports.getMatriculaUOficialF = exports.getMatriculaURealF = exports.setMatriculaBackup = exports.fetchMatriculaData = void 0;
const matriculaService = __importStar(require("../services/FactMatriculaService"));
const fetchMatriculaData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield matriculaService.getMatricula();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchMatriculaData = fetchMatriculaData;
const setMatriculaBackup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield matriculaService.insertarNuevasMatriculas();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.setMatriculaBackup = setMatriculaBackup;
const getMatriculaURealF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fechaInicio, fechaFin } = req.params;
        const data = yield matriculaService.getMatriculaUnidadRealF(fechaInicio, fechaFin);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaURealF = getMatriculaURealF;
const getMatriculaUOficialF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fechaInicio, fechaFin } = req.params;
        const data = yield matriculaService.getMatriculaUnidadOficialF(fechaInicio, fechaFin);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaUOficialF = getMatriculaUOficialF;
const getMatriculaUReal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield matriculaService.getMatriculaUnidadReal();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaUReal = getMatriculaUReal;
const getMatriculaUOficial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield matriculaService.getMatriculaUnidadOficial();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaUOficial = getMatriculaUOficial;
const getMatriculaO = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield matriculaService.getMatriculaOUnidad(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaO = getMatriculaO;
const getMatriculaR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield matriculaService.getMatriculaRUnidad(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaR = getMatriculaR;
const getMatriculaRF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad, fechaInicio, fechaFin } = req.params;
        const data = yield matriculaService.getMatriculaRUnidadF(unidad, fechaInicio, fechaFin);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaRF = getMatriculaRF;
const getMatriculaURealClase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clase } = req.params;
        const data = yield matriculaService.getMatriculaUnidadRealClase(clase);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaURealClase = getMatriculaURealClase;
const getEstatusGeneral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad, carreras, inicio, fin, periodo } = req.query;
        const data = yield matriculaService.getEstatus(unidad, carreras, inicio, fin, periodo);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEstatusGeneral = getEstatusGeneral;
const getSemestreGeneral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad, carreras, inicio, fin, periodo } = req.query;
        const data = yield matriculaService.getSemestre(unidad, carreras, inicio, fin, periodo);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getSemestreGeneral = getSemestreGeneral;
const getMatriculaURealCorte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield matriculaService.getMatriculaRealCorte();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaURealCorte = getMatriculaURealCorte;
const getMatriculaURealTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inicio, fin, unidad, periodo } = req.query;
        const data = yield matriculaService.getMatriculaRealTotal(unidad, inicio, fin, periodo);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaURealTotal = getMatriculaURealTotal;
const getMatriculaPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inicio, fin, unidad, periodo } = req.query;
        const data = yield matriculaService.getMatriculaPeriodo(unidad, inicio, fin, periodo);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatriculaPeriodo = getMatriculaPeriodo;
