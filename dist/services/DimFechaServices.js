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
exports.getPeriodo = exports.getAllFechas = exports.getIdsFechas = exports.getFechaData = exports.getFechaAct = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const fechaQueries_1 = require("../database/fechaQueries");
const getFechaAct = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.dataDB.query(fechaQueries_1.queries.setEspanol);
        let idFecha = yield connection_1.dataDB.query(fechaQueries_1.queries.getFechaAct, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (idFecha.length === 0) {
            const periodoR = yield connection_1.coreDB.query(fechaQueries_1.queries.getPeriodo, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (periodoR.length > 0) {
                yield connection_1.dataDB.query(fechaQueries_1.queries.setFechaAct, {
                    type: sequelize_1.QueryTypes.INSERT,
                    replacements: { period: periodoR[0].periodo }
                });
                idFecha = (yield connection_1.dataDB.query(fechaQueries_1.queries.getFechaAct, {
                    type: sequelize_1.QueryTypes.SELECT,
                }));
            }
            else {
                throw new Error("No se encontró ningún periodo en la base de datos core");
            }
        }
        return idFecha.length > 0 ? idFecha[0].id : null;
    }
    catch (error) {
        console.error("Error obteniendo el ID de la fecha:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getFechaAct = getFechaAct;
const getFechaData = (idReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fecha = yield connection_1.dataDB.query(fechaQueries_1.queries.getFecha, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        });
        return fecha;
    }
    catch (error) {
        console.error("Error obteniendo los datos de la fecha:", error);
        throw error;
    }
});
exports.getFechaData = getFechaData;
const getIdsFechas = (fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Ids = yield connection_1.dataDB.query(fechaQueries_1.queries.getIdsFechas, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            }
        });
        return Ids;
    }
    catch (error) {
        console.error("Error obteniendo los Ids de las Fechas:", error);
        throw error;
    }
});
exports.getIdsFechas = getIdsFechas;
const getAllFechas = (periodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fechas = yield connection_1.dataDB.query(fechaQueries_1.queries.getAllFechas, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                periodo: periodo
            }
        });
        return fechas;
    }
    catch (error) {
        console.error("Error obteniendo las Fechas:", error);
        throw error;
    }
});
exports.getAllFechas = getAllFechas;
const getPeriodo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const periodo = yield connection_1.coreDB.query(fechaQueries_1.queries.getPeriodo, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return periodo[0].periodo;
    }
    catch (error) {
        console.error("Error obteniendo el periodo:", error);
        throw error;
    }
});
exports.getPeriodo = getPeriodo;
