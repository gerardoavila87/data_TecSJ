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
exports.getAllModalidades = exports.getModalidades = void 0;
const modalidadServices = __importStar(require("../services/DimModalidadServices"));
const getModalidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad, fechaInicio, fechaFin } = req.params;
        console.log('unidad:' + unidad + 'fechaInicio:' + fechaInicio + 'fechaFin:' + fechaFin);
        let modalidades;
        if (unidad && fechaInicio && fechaFin) {
            // Si se proporcionan unidad y fechas, filtra por ambas
            modalidades = yield modalidadServices.getModalidadesUnidadFecha(unidad, fechaInicio, fechaFin);
        }
        else if (unidad) {
            // Si solo se proporciona la unidad
            modalidades = yield modalidadServices.getModalidadesUnidad(unidad);
        }
        else if (fechaInicio && fechaFin) {
            // Si solo se proporcionan las fechas
            console.log('fechas');
            modalidades = yield modalidadServices.getModalidadesFecha(fechaInicio, fechaFin);
        }
        else {
            // Si no se proporciona ni unidad ni fechas, obtener todas las modalidades
            modalidades = yield modalidadServices.getModalidades();
        }
        res.status(200).json(modalidades);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getModalidades = getModalidades;
const getAllModalidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unidad, carreras, inicio, fin } = req.query;
        const data = yield modalidadServices.getAllModalidades(unidad, carreras, inicio, fin);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllModalidades = getAllModalidades;
