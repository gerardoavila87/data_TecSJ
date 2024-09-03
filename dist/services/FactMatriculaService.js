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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMatriculaData = exports.getMatriculaData = void 0;
const FactMatricula_1 = __importDefault(require("../models/FactMatricula")); // Importa el modelo FactMatricula
const connection_1 = require("../database/connection"); // Importa la conexión de la base de datos
const sequelize_1 = require("sequelize"); // Importa QueryTypes
const queries_1 = require("../database/queries"); // Importa la consulta SQL (asegúrate de que esté exportada en queries.ts)
const getMatriculaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.coreDB.query(queries_1.getMatriculaQuery, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    return result;
});
exports.getMatriculaData = getMatriculaData;
const insertMatriculaData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield FactMatricula_1.default.create(data);
});
exports.insertMatriculaData = insertMatriculaData;
