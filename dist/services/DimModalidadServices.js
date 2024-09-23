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
exports.getIdFechas = exports.getModalidadesUnidadFecha = exports.getModalidadesFecha = exports.getModalidadesUnidad = exports.getModalidades = exports.getAllModalidades = exports.setModalidadData = exports.getModalidadCore = exports.getModalidadData = exports.getIdModalidadData = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const modalidadQueries_1 = require("../database/modalidadQueries");
const DimFechaServices_1 = require("./DimFechaServices");
const getIdModalidadData = (modalidadR) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IdModalidad = yield connection_1.dataDB.query(modalidadQueries_1.queries.getIdModalidadData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                modalidad: modalidadR
            }
        }); // Tipar el resultado como un array de objetos con el campo 'id'
        return IdModalidad.length > 0 ? IdModalidad[0].id : null;
    }
    catch (error) {
        console.error("Error obteniendo el ID del Modalidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getIdModalidadData = getIdModalidadData;
const getModalidadData = (idReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Modalidad = yield connection_1.dataDB.query(modalidadQueries_1.queries.getModalidadData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        });
        return Modalidad;
    }
    catch (error) {
        console.error("Error obteniendo el data.Modalidad:", error);
        throw error;
    }
});
exports.getModalidadData = getModalidadData;
const getModalidadCore = (control) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Modalidad = yield connection_1.coreDB.query(modalidadQueries_1.queries.getModalidadCore, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        });
        return Modalidad[0];
    }
    catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
});
exports.getModalidadCore = getModalidadCore;
const setModalidadData = (modalidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(modalidadQueries_1.queries.setModalidadData, {
            type: sequelize_1.QueryTypes.INSERT,
            replacements: {
                nombre: modalidad
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error al INSERTAR el Modalidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.setModalidadData = setModalidadData;
const getAllModalidades = (unidad, carreras, inicio, fin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ids = [];
        if (inicio && fin) {
            const resIds = yield (0, DimFechaServices_1.getIdsFechas)(inicio, fin);
            ids = resIds.map(item => item.idFecha);
        }
        const replacements = Object.assign(Object.assign(Object.assign({}, (carreras && { carreras })), (unidad && { unidad })), (ids.length > 0 && { ids }));
        const query = (0, modalidadQueries_1.getModalidadesQuery)(unidad, carreras, ids);
        const Modalidad = yield connection_1.dataDB.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements
        });
        return Modalidad;
    }
    catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
});
exports.getAllModalidades = getAllModalidades;
const getModalidades = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Modalidad = yield connection_1.dataDB.query(modalidadQueries_1.queries.getModalidades, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return Modalidad;
    }
    catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
});
exports.getModalidades = getModalidades;
const getModalidadesUnidad = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Modalidad = yield connection_1.dataDB.query(modalidadQueries_1.queries.getModalidadesUnidad, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return Modalidad;
    }
    catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
});
exports.getModalidadesUnidad = getModalidadesUnidad;
const getModalidadesFecha = (fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = yield (0, exports.getIdFechas)(fechaInicio, fechaFin);
        if (ids.length === 0) {
            return null;
        }
        const Modalidad = yield connection_1.dataDB.query(modalidadQueries_1.queries.getModalidadesFecha, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ids: ids
            }
        });
        return Modalidad;
    }
    catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
});
exports.getModalidadesFecha = getModalidadesFecha;
const getModalidadesUnidadFecha = (unidad, fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = yield (0, exports.getIdFechas)(fechaInicio, fechaFin);
        if (ids.length === 0) {
            return null;
        }
        const Modalidad = yield connection_1.dataDB.query(modalidadQueries_1.queries.getModalidadesUnidadFecha, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad,
                ids: ids
            }
        });
        return Modalidad;
    }
    catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
});
exports.getModalidadesUnidadFecha = getModalidadesUnidadFecha;
const getIdFechas = (fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(fechaInicio, fechaFin);
        const ids = idsRes.map(item => item.idFecha);
        console.log(ids);
        return ids;
    }
    catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
});
exports.getIdFechas = getIdFechas;
