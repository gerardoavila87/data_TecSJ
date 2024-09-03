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
exports.createMatriculaRecord = exports.fetchMatriculaData = void 0;
const FactMatriculaService_1 = require("../services/FactMatriculaService");
const fetchMatriculaData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, FactMatriculaService_1.getMatriculaData)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchMatriculaData = fetchMatriculaData;
const createMatriculaRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRecord = yield (0, FactMatriculaService_1.insertMatriculaData)(req.body);
        res.status(201).json(newRecord);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createMatriculaRecord = createMatriculaRecord;
