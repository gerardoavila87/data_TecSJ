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
exports.getEstudioURCarrera = exports.getEstudioURC = exports.getEstudioUOC = exports.getEstudioUO = exports.getEstudioUR = exports.getAllEstudio = exports.setEstudioData = exports.getEstudioCore = exports.getEstudioData = exports.getIdEstudioData = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const estudioQueries_1 = require("../database/estudioQueries");
const DimFechaServices_1 = require("./DimFechaServices");
const getIdEstudioData = (escuelaR) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IdEstudio = yield connection_1.dataDB.query(estudioQueries_1.queries.getIdEstudioData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                escuela: escuelaR
            }
        }); // Tipar el resultado como un array de objetos con el campo 'id'
        return IdEstudio.length > 0 ? IdEstudio[0].id : null;
    }
    catch (error) {
        console.error("Error obteniendo el ID del estudio:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getIdEstudioData = getIdEstudioData;
const getEstudioData = (idReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudio = yield connection_1.dataDB.query(estudioQueries_1.queries.getEstudioData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        });
        return estudio;
    }
    catch (error) {
        console.error("Error obteniendo el data.estudio:", error);
        throw error;
    }
});
exports.getEstudioData = getEstudioData;
const getEstudioCore = (control) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudio = yield connection_1.coreDB.query(estudioQueries_1.queries.getEstudioCore, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        });
        return estudio[0];
    }
    catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
});
exports.getEstudioCore = getEstudioCore;
const setEstudioData = (estudio) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(estudioQueries_1.queries.setEstudioData, {
            type: sequelize_1.QueryTypes.INSERT,
            replacements: {
                clave: estudio.clave,
                nombre: estudio.nombre,
                estado: estudio.estado,
                municipio: estudio.municipio,
                nivel: estudio.nivel,
                tipo: estudio.tipo
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error al INSERTAR el estudio:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.setEstudioData = setEstudioData;
const getAllEstudio = (unidad, carreras, inicio, fin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ids = [];
        const replacements = {};
        if (inicio && fin) {
            const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(inicio, fin);
            ids = idsRes.map(item => item.idFecha);
        }
        const query = (0, estudioQueries_1.getEstudiosQuery)(unidad, carreras, ids);
        console.log(unidad);
        console.log(query);
        if (carreras)
            replacements.carreras = carreras;
        if (unidad)
            replacements.unidad = unidad;
        if (ids.length > 0)
            replacements.ids = ids;
        const estudios = yield connection_1.dataDB.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements
        });
        return estudios;
    }
    catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
});
exports.getAllEstudio = getAllEstudio;
const getEstudioUR = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudios = yield connection_1.dataDB.query(estudioQueries_1.queries.getEstudiosUR, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return estudios;
    }
    catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
});
exports.getEstudioUR = getEstudioUR;
const getEstudioUO = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudios = yield connection_1.dataDB.query(estudioQueries_1.queries.getEstudiosUO, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return estudios;
    }
    catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
});
exports.getEstudioUO = getEstudioUO;
const getEstudioUOC = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudios = yield connection_1.dataDB.query(estudioQueries_1.queries.getEstudiosUOC, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return estudios;
    }
    catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
});
exports.getEstudioUOC = getEstudioUOC;
const getEstudioURC = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudios = yield connection_1.dataDB.query(estudioQueries_1.queries.getEstudiosURC, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return estudios;
    }
    catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
});
exports.getEstudioURC = getEstudioURC;
const getEstudioURCarrera = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudios = yield connection_1.dataDB.query(estudioQueries_1.queries.getEstudiosURCarrera, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return estudios;
    }
    catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
});
exports.getEstudioURCarrera = getEstudioURCarrera;
