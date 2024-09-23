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
exports.getEstudiantes = exports.setEstudianteData = exports.getEstudianteCore = exports.getEstudianteData = exports.getIdEstudianteData = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const estudianteQueries_1 = require("../database/estudianteQueries");
const DimFechaServices_1 = require("./DimFechaServices");
const getIdEstudianteData = (control) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IdEstudiante = yield connection_1.dataDB.query(estudianteQueries_1.queries.getIdEstudianteData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        });
        return IdEstudiante.length > 0 ? IdEstudiante[0].id : null;
    }
    catch (error) {
        console.error("Error obteniendo el ID del estudiante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getIdEstudianteData = getIdEstudianteData;
const getEstudianteData = (idReq) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiante = yield connection_1.dataDB.query(estudianteQueries_1.queries.getEstudianteData, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        });
        return estudiante;
    }
    catch (error) {
        console.error("Error obteniendo el data.estudiante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getEstudianteData = getEstudianteData;
const getEstudianteCore = (control) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiantes = yield connection_1.coreDB.query(estudianteQueries_1.queries.getEstudianteCore, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        }); // Tipar el resultado como un array de objetos de tipo EstudianteType
        return estudiantes[0]; // Retorna el primer estudiante si existe
    }
    catch (error) {
        console.error("Error obteniendo el core.estudiante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.getEstudianteCore = getEstudianteCore;
const setEstudianteData = (estudiante) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.dataDB.query(estudianteQueries_1.queries.setEstudianteData, {
            type: sequelize_1.QueryTypes.INSERT,
            replacements: {
                nocontrol: estudiante.nocontrol,
                curp: estudiante.curp,
                lugarNacimiento: estudiante.lugarNacimiento,
                nombre: estudiante.nombre,
                primerApellido: estudiante.primerApellido,
                segundoApellido: estudiante.segundoApellido,
                seguro: estudiante.seguro,
                genero: estudiante.genero,
                celular: estudiante.celular,
                correo: estudiante.correo,
                indigena: estudiante.indigena
            }
        });
        const idEstudiante = (0, exports.getIdEstudianteData)(estudiante.nocontrol);
        return idEstudiante;
    }
    catch (error) {
        console.error("Error al INSERTAR el estudiante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
});
exports.setEstudianteData = setEstudianteData;
const getEstudiantes = (tipo, unidad, fechaInicio, fechaFin, carreras) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ids = [];
        const replacements = {};
        if (fechaInicio && fechaFin) {
            const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(fechaInicio, fechaFin);
            ids = idsRes.map(item => item.idFecha);
        }
        const query = (0, estudianteQueries_1.getEstudiantesQuery)(tipo, unidad, ids, carreras);
        if (unidad != 'unidad')
            replacements.unidad = unidad;
        if (carreras)
            replacements.carreras = carreras;
        if (ids.length > 0)
            replacements.ids = ids;
        console.log(query);
        console.log(ids);
        const result = yield connection_1.dataDB.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements
        });
        return result;
    }
    catch (error) {
        console.error("Error al CONSULTAR el estudiante:", error);
        throw error;
    }
});
exports.getEstudiantes = getEstudiantes;
