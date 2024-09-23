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
exports.getDiscapacidadCarrera = exports.getDiscapacidadURCFecha = exports.getDiscapacidadURFecha = exports.getAllDiscapacidad = exports.getDiscapacidadUO = exports.getDiscapacidadUR = exports.getDiscapacidadURC = exports.getDiscapacidadUOC = exports.setDiscapacidadData = exports.getDiscapacidadCore = exports.getDiscapacidadData = exports.getIdDiscapacidadData = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const discapacidadQueries_1 = require("../database/discapacidadQueries");
const DimFechaServices_1 = require("./DimFechaServices");
const getIdDiscapacidadData = (discapacidadR) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IdDiscapacidad = yield connection_1.dataDB.query(discapacidadQueries_1.queries.getIdDiscapacidadData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                discapacidad: discapacidadR
            }
        });
        return IdDiscapacidad.length > 0 ? IdDiscapacidad[0].id : null;
    }
    catch (error) {
        console.error("Error obteniendo el ID de la discapacidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getIdDiscapacidadData = getIdDiscapacidadData;
const getDiscapacidadData = (idReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discapacidad = yield connection_1.dataDB.query(discapacidadQueries_1.queries.getDiscapacidadData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        });
        return discapacidad;
    }
    catch (error) {
        console.error("Error obteniendo la data.discapacidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getDiscapacidadData = getDiscapacidadData;
const getDiscapacidadCore = (controlReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discapacidad = yield connection_1.coreDB.query(discapacidadQueries_1.queries.getDiscapacidadCore, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                control: controlReq
            }
        }); // Tipar el resultado como un array de objetos con el campo 'id'
        return discapacidad;
    }
    catch (error) {
        console.error("Error obteniendo la core.discapacidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getDiscapacidadCore = getDiscapacidadCore;
const setDiscapacidadData = (discapacidadR) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(discapacidadQueries_1.queries.setDiscapacidadData, {
            type: sequelize_1.QueryTypes.INSERT,
            replacements: {
                clave: discapacidadR,
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error al INSERTAR la discapacidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.setDiscapacidadData = setDiscapacidadData;
const getDiscapacidadUOC = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(discapacidadQueries_1.queries.getDiscapacidadesUOC, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getDiscapacidadUOC = getDiscapacidadUOC;
const getDiscapacidadURC = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(discapacidadQueries_1.queries.getDiscapacidadesURC, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getDiscapacidadURC = getDiscapacidadURC;
const getDiscapacidadUR = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(discapacidadQueries_1.queries.getDiscapacidadesUR, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return result;
    }
    catch (error) {
        console.error("Error obteniendo las discapacidades", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getDiscapacidadUR = getDiscapacidadUR;
const getDiscapacidadUO = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(discapacidadQueries_1.queries.getDiscapacidadesUO, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return result;
    }
    catch (error) {
        console.error("Error obteniendo las discapacidades", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getDiscapacidadUO = getDiscapacidadUO;
const getAllDiscapacidad = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(discapacidadQueries_1.queries.getAllDiscapacidades, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return result;
    }
    catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getAllDiscapacidad = getAllDiscapacidad;
const getDiscapacidadURFecha = (fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(fechaInicio, fechaFin);
        const ids = idsRes.map(item => item.idFecha);
        const result = yield connection_1.dataDB.query(discapacidadQueries_1.queries.getDiscapacidadesURFecha, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ids: ids
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error obteniendo las discapacidades", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getDiscapacidadURFecha = getDiscapacidadURFecha;
const getDiscapacidadURCFecha = (unidad, fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(fechaInicio, fechaFin);
        const ids = idsRes.map(item => item.idFecha);
        const result = yield connection_1.dataDB.query(discapacidadQueries_1.queries.getDiscapacidadesURFecha, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad,
                ids: ids
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getDiscapacidadURCFecha = getDiscapacidadURCFecha;
const getDiscapacidadCarrera = (unidad, fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ids = [];
        let replacements = {};
        if (fechaInicio && fechaFin) {
            const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(fechaInicio, fechaFin);
            ids = idsRes.map(item => item.idFecha);
        }
        let query = (0, discapacidadQueries_1.getDiscapacidadCarreraQuery)(unidad, ids);
        if (ids.length > 0)
            replacements.ids = ids;
        if (unidad)
            replacements.unidad = unidad;
        const result = yield connection_1.dataDB.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements
        });
        return result;
    }
    catch (error) {
        console.error("Error obteniendo la discapacidad por carrera:", error);
        throw error;
    }
});
exports.getDiscapacidadCarrera = getDiscapacidadCarrera;
