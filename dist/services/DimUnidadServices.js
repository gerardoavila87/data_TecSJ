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
exports.getAllUnidadOficial = exports.getAllUnidadReal = exports.setUnidadData = exports.getUnidadOficial = exports.getUnidadReal = exports.getUnidadData = exports.getIdUnidadData = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const unidadQueries_1 = require("../database/unidadQueries");
const getIdUnidadData = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUnidad = yield connection_1.dataDB.query(unidadQueries_1.queries.getIdUnidadData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                nombre: unidad
            }
        });
        return idUnidad.length > 0 ? idUnidad[0].id : null;
    }
    catch (error) {
        console.error("Error obteniendo el ID la Unidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getIdUnidadData = getIdUnidadData;
const getUnidadData = (idReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unidad = yield connection_1.dataDB.query(unidadQueries_1.queries.getUnidadData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        });
        return unidad[0];
    }
    catch (error) {
        console.error("Error obteniendo la data.Unidad:", error);
        throw error;
    }
});
exports.getUnidadData = getUnidadData;
const getUnidadReal = (control) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unidad = yield connection_1.coreDB.query(unidadQueries_1.queries.getUnidadReal, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        });
        return unidad[0];
    }
    catch (error) {
        console.error("Error obteniendo la core.Unidad:", error);
        throw error;
    }
});
exports.getUnidadReal = getUnidadReal;
const getUnidadOficial = (control) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unidad = yield connection_1.coreDB.query(unidadQueries_1.queries.getUnidadOficial, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        });
        return unidad[0];
    }
    catch (error) {
        console.error("Error obteniendo la core.Unidad:", error);
        throw error;
    }
});
exports.getUnidadOficial = getUnidadOficial;
const setUnidadData = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(unidadQueries_1.queries.setUnidadData, {
            type: sequelize_1.QueryTypes.INSERT,
            replacements: {
                clave: unidad.clave,
                nombre: unidad.nombre
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error al INSERTAR la Unidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.setUnidadData = setUnidadData;
const getAllUnidadReal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(unidadQueries_1.queries.getAllUnidadReal, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return result;
    }
    catch (error) {
        console.error("Error OBTENIENDO las Unidades:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getAllUnidadReal = getAllUnidadReal;
const getAllUnidadOficial = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(unidadQueries_1.queries.getAllUnidadOficial, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return result;
    }
    catch (error) {
        console.error("Error OBTENIENDO las Unidades:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getAllUnidadOficial = getAllUnidadOficial;
