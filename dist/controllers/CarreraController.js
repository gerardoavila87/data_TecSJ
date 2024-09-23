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
exports.getCarreraR = exports.getAllCarrerasReal = exports.getAllCarrerasR = exports.getCarreraO = exports.getAllCarrerasO = void 0;
const DimCarreraServices_1 = require("../services/DimCarreraServices");
const getAllCarrerasO = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield (0, DimCarreraServices_1.getAllCarrerasUO)(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCarrerasO = getAllCarrerasO;
const getCarreraO = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield (0, DimCarreraServices_1.getCarreraUO)(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCarreraO = getCarreraO;
const getAllCarrerasR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const data = yield (0, DimCarreraServices_1.getAllCarrerasUR)(unidad);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCarrerasR = getAllCarrerasR;
const getAllCarrerasReal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, DimCarreraServices_1.getAllCarrerasUReal)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCarrerasReal = getAllCarrerasReal;
const getCarreraR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad } = req.params;
        const { inicio, fin } = req.query;
        const data = yield (0, DimCarreraServices_1.getCarreraUR)(unidad, inicio, fin);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCarreraR = getCarreraR;
