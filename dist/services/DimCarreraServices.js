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
exports.getCarreraUR = exports.getAllCarrerasUReal = exports.getAllCarrerasUR = exports.getCarreraUO = exports.getAllCarrerasUO = exports.setCarreraData = exports.getClaveCarreraCore = exports.getClaveCarreraData = exports.getIdCarreraData = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const carreraQueries_1 = require("../database/carreraQueries");
const DimFechaServices_1 = require("./DimFechaServices");
const getIdCarreraData = (claveReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idCarrera = yield connection_1.dataDB.query(carreraQueries_1.queries.getIdCarreraData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                clave: claveReq
            }
        });
        return idCarrera.length > 0 ? idCarrera[0].id : null;
    }
    catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getIdCarreraData = getIdCarreraData;
const getClaveCarreraData = (idReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claveCarrera = yield connection_1.dataDB.query(carreraQueries_1.queries.getClaveCarreraData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        });
        return claveCarrera[0];
    }
    catch (error) {
        console.error("Error obteniendo la data.CLAVE de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getClaveCarreraData = getClaveCarreraData;
const getClaveCarreraCore = (controlReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claveCarrera = yield connection_1.coreDB.query(carreraQueries_1.queries.getClaveCarreraCore, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                control: controlReq
            }
        });
        return claveCarrera;
    }
    catch (error) {
        console.error("Error obteniendo la core.CLAVE de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getClaveCarreraCore = getClaveCarreraCore;
const setCarreraData = (carrera) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(carreraQueries_1.queries.setCarreraData, {
            type: sequelize_1.QueryTypes.INSERT,
            replacements: {
                clave: carrera.clave,
                abreviacion: carrera.abreviacion,
                nombre: carrera.nombre
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error al INSERTAR la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.setCarreraData = setCarreraData;
const getAllCarrerasUO = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(carreraQueries_1.queries.getAllCarrerasO, {
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
exports.getAllCarrerasUO = getAllCarrerasUO;
const getCarreraUO = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(carreraQueries_1.queries.getCarreraUnidadO, {
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
exports.getCarreraUO = getCarreraUO;
const getAllCarrerasUR = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(carreraQueries_1.queries.getAllCarrerasR, {
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
exports.getAllCarrerasUR = getAllCarrerasUR;
const getAllCarrerasUReal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(carreraQueries_1.queries.getAllCarrerasReal, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        return result;
    }
    catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getAllCarrerasUReal = getAllCarrerasUReal;
;
const getCarreraUR = (unidad, fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (fechaInicio && fechaFin) {
            const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(fechaInicio, fechaFin);
            const ids = idsRes.map(item => item.idFecha);
            console.log(ids);
            const result = yield connection_1.dataDB.query(carreraQueries_1.queries.getCarreraUnidadRFecha, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: {
                    unidad: unidad,
                    ids: ids
                }
            });
            return result;
        }
        else {
            const result = yield connection_1.dataDB.query(carreraQueries_1.queries.getCarreraUnidadR, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: {
                    unidad: unidad
                }
            });
            return result;
        }
    }
    catch (error) {
        console.error("Error obteniendo los estudiantes por carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getCarreraUR = getCarreraUR;
