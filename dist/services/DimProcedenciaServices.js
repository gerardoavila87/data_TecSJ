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
exports.getProcedenciasUnidadFecha = exports.getProcedenciasUnidad = exports.getProcedenciasFecha = exports.getProcedencias = exports.getAllProcedencias = exports.setProcedenciaData = exports.getProcedenciaCore = exports.getProcedenciaData = exports.getIdProcedenciaData = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const procedenciaQueries_1 = require("../database/procedenciaQueries");
const DimFechaServices_1 = require("./DimFechaServices");
const getIdProcedenciaData = (procedencia) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idProcedencia = yield connection_1.dataDB.query(procedenciaQueries_1.queries.getIdProcedenciaData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                municipio: procedencia.municipio,
                estado: procedencia.estado
            }
        });
        return idProcedencia.length > 0 ? idProcedencia[0].id : null;
    }
    catch (error) {
        console.error("Error obteniendo el ID la Procedencia:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getIdProcedenciaData = getIdProcedenciaData;
const getProcedenciaData = (idReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const procedencia = yield connection_1.dataDB.query(procedenciaQueries_1.queries.getProcedenciaData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        });
        return procedencia[0];
    }
    catch (error) {
        console.error("Error obteniendo la data.Procedencia:", error);
        throw error;
    }
});
exports.getProcedenciaData = getProcedenciaData;
const getProcedenciaCore = (control) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const procedencia = yield connection_1.coreDB.query(procedenciaQueries_1.queries.getProcedenciaCore, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        });
        return procedencia[0];
    }
    catch (error) {
        console.error("Error obteniendo la core.Procedencia:", error);
        throw error;
    }
});
exports.getProcedenciaCore = getProcedenciaCore;
const setProcedenciaData = (procedencia) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(procedenciaQueries_1.queries.setProcedenciaData, {
            type: sequelize_1.QueryTypes.INSERT,
            replacements: {
                municipio: procedencia.municipio,
                estado: procedencia.estado
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
});
exports.setProcedenciaData = setProcedenciaData;
const getAllProcedencias = (unidad, carreras, inicio, fin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ids = [];
        if (inicio && fin) {
            const resIds = yield (0, DimFechaServices_1.getIdsFechas)(inicio, fin);
            ids = resIds.map(item => item.idFecha);
        }
        const replacements = Object.assign(Object.assign(Object.assign({}, (carreras && { carreras })), (unidad && { unidad })), (ids.length > 0 && { ids }));
        const query = (0, procedenciaQueries_1.getProcedenciaQuery)(unidad, carreras, ids);
        const result = yield connection_1.dataDB.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements
        });
        return result;
    }
    catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
});
exports.getAllProcedencias = getAllProcedencias;
const getProcedencias = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(procedenciaQueries_1.queries.getProcedencias, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return result;
    }
    catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
});
exports.getProcedencias = getProcedencias;
const getProcedenciasFecha = (fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(procedenciaQueries_1.queries.getProcedenciasFecha, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return result;
    }
    catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
});
exports.getProcedenciasFecha = getProcedenciasFecha;
const getProcedenciasUnidad = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(procedenciaQueries_1.queries.getProcedenciasUnidad, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
});
exports.getProcedenciasUnidad = getProcedenciasUnidad;
const getProcedenciasUnidadFecha = (unidad, fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(procedenciaQueries_1.queries.getProcedenciasUnidadFecha, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return result;
    }
    catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
});
exports.getProcedenciasUnidadFecha = getProcedenciasUnidadFecha;
