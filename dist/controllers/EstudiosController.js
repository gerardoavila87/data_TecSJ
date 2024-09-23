"use strict";
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
exports.getEstudiosURCarrera = exports.getEstudiosURC = exports.getEstudiosUOC = exports.getEstudiosUO = exports.getEstudiosUR = exports.getAllEstudios = void 0;
const DimEstudiosServices_1 = require("../services/DimEstudiosServices");
const getAllEstudios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        const { inicio, fin, unidad, carreras } = req.query;
        data = yield (0, DimEstudiosServices_1.getAllEstudio)(unidad, carreras, inicio, fin);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllEstudios = getAllEstudios;
const getEstudiosUR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, DimEstudiosServices_1.getEstudioUR)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEstudiosUR = getEstudiosUR;
const getEstudiosUO = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, DimEstudiosServices_1.getEstudioUO)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEstudiosUO = getEstudiosUO;
const getEstudiosUOC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield (0, DimEstudiosServices_1.getEstudioUOC)(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEstudiosUOC = getEstudiosUOC;
const getEstudiosURC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield (0, DimEstudiosServices_1.getEstudioURC)(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEstudiosURC = getEstudiosURC;
const getEstudiosURCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield (0, DimEstudiosServices_1.getEstudioURCarrera)(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEstudiosURCarrera = getEstudiosURCarrera;
