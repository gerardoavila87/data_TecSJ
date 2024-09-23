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
exports.getDiscapacidadesURCFecha = exports.getDiscapacidadesURFecha = exports.getDiscapacidadesURC = exports.getDiscapacidadesUOC = exports.getDiscapacidadesUO = exports.getDiscapacidadesUR = exports.getAllDiscapacidades = void 0;
const DiscapacidadServices = __importStar(require("../services/DimDiscapacidadServices"));
const getAllDiscapacidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        const { unidad, inicio, fin, carreras } = req.query;
        if (carreras)
            data = yield DiscapacidadServices.getDiscapacidadCarrera(carreras, inicio, fin);
        else if (unidad)
            data = yield DiscapacidadServices.getDiscapacidadURC(unidad);
        else if (inicio && fin)
            data = yield DiscapacidadServices.getDiscapacidadURFecha(inicio, fin);
        else if (inicio && fin && unidad)
            data = yield DiscapacidadServices.getDiscapacidadURCFecha(unidad, inicio, fin);
        else
            data = yield DiscapacidadServices.getAllDiscapacidad();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllDiscapacidades = getAllDiscapacidades;
const getDiscapacidadesUR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield DiscapacidadServices.getDiscapacidadUR();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getDiscapacidadesUR = getDiscapacidadesUR;
const getDiscapacidadesUO = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield DiscapacidadServices.getDiscapacidadUO();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getDiscapacidadesUO = getDiscapacidadesUO;
const getDiscapacidadesUOC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield DiscapacidadServices.getDiscapacidadUOC(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getDiscapacidadesUOC = getDiscapacidadesUOC;
const getDiscapacidadesURC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield DiscapacidadServices.getDiscapacidadURC(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getDiscapacidadesURC = getDiscapacidadesURC;
const getDiscapacidadesURFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fechaInicio, fechaFin } = req.params;
        const data = yield DiscapacidadServices.getDiscapacidadURFecha(fechaInicio, fechaFin);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getDiscapacidadesURFecha = getDiscapacidadesURFecha;
const getDiscapacidadesURCFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad, fechaInicio, fechaFin } = req.params;
        const data = yield DiscapacidadServices.getDiscapacidadURCFecha(unidad, fechaInicio, fechaFin);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getDiscapacidadesURCFecha = getDiscapacidadesURCFecha;
