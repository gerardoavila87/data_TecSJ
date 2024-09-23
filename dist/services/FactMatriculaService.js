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
exports.getMatriculaPeriodo = exports.getMatriculaRealTotal = exports.getMatriculaRealCorte = exports.getSemestre = exports.getEstatus = exports.getMatriculaRUnidadF = exports.getMatriculaRUnidad = exports.getMatriculaOUnidad = exports.getMatriculaUnidadOficial = exports.getMatriculaUnidadRealClase = exports.getMatriculaUnidadReal = exports.getMatriculaUnidadOficialF = exports.getMatriculaUnidadRealF = exports.getMatricula = exports.compareMatricula = exports.insertarNuevasMatriculas = exports.updateMatriculaFechaTermino = exports.setMatricula = exports.getMatriculaData = exports.getMatriculaCoreBackup = exports.getMatriculaCore = void 0;
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const matriculaQueries_1 = require("../database/matriculaQueries");
const DimEstudianteServices_1 = require("./DimEstudianteServices");
const DimCarreraServices_1 = require("./DimCarreraServices");
const DimModalidadServices_1 = require("./DimModalidadServices");
const DimEstudiosServices_1 = require("./DimEstudiosServices");
const DimProcedenciaServices_1 = require("./DimProcedenciaServices");
const DimUnidadServices_1 = require("./DimUnidadServices");
const DimFechaServices_1 = require("./DimFechaServices");
const DimDiscapacidadServices_1 = require("./DimDiscapacidadServices");
const getMatriculaCore = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matricula = yield connection_1.coreDB.query(matriculaQueries_1.queries.getMatriculaCore, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta Core:", error);
        throw error;
    }
});
exports.getMatriculaCore = getMatriculaCore;
const getMatriculaCoreBackup = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matricula = yield connection_1.coreBackupDB.query(matriculaQueries_1.queries.getMatriculaCoreBackup, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta CoreBackup:", error);
        throw error;
    }
});
exports.getMatriculaCoreBackup = getMatriculaCoreBackup;
const getMatriculaData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaData, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta Data:", error);
        throw error;
    }
});
exports.getMatriculaData = getMatriculaData;
const setMatricula = (matricula) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.dataDB.query(matriculaQueries_1.queries.setMatricula, {
            type: sequelize_1.QueryTypes.INSERT,
            replacements: {
                idEstudiante: matricula.idEstudiante,
                idCarrera: matricula.idCarrera,
                idModalidad: matricula.idModalidad,
                idEstudio: matricula.idEstudio,
                idProcedencia: matricula.idProcedencia,
                idUnidadReal: matricula.idUnidadReal,
                idUnidadOficial: matricula.idUnidadOficial,
                idDiscapacidad: matricula.idDiscapacidad,
                idFechaInicio: matricula.idFechaInicio,
                idFechaTermino: matricula.idFechaTermino,
                semestre: matricula.semestre,
                status: matricula.status
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error al INSERTAR la Matricula:", error);
        throw error;
    }
});
exports.setMatricula = setMatricula;
const updateMatriculaFechaTermino = (idEstudiante, idFecha) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idMatricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getUltimaMatriculaEstudiante, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                idEstudiante: idEstudiante
            }
        });
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.upMatriculaFechaTermino, {
            type: sequelize_1.QueryTypes.UPDATE,
            replacements: {
                idMatricula: idMatricula[0].matricula,
                idFecha: idFecha
            }
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
});
exports.updateMatriculaFechaTermino = updateMatriculaFechaTermino;
const insertarNuevasMatriculas = () => __awaiter(void 0, void 0, void 0, function* () {
    const [matriculaCore, idFechaActual] = yield Promise.all([
        (0, exports.getMatriculaCoreBackup)(),
        (0, DimFechaServices_1.getFechaAct)()
    ]);
    if (matriculaCore && (matriculaCore === null || matriculaCore === void 0 ? void 0 : matriculaCore.length) > 0) {
        const operaciones = matriculaCore.map((matricula) => __awaiter(void 0, void 0, void 0, function* () {
            // Verificar si el estudiante ya existe en la base de datos
            let idEstudiante = yield (0, DimEstudianteServices_1.getIdEstudianteData)(matricula.nocontrol);
            if (!idEstudiante) {
                // Si el estudiante no existe, insertarlo
                const nuevoEstudiante = {
                    nocontrol: matricula.nocontrol,
                    curp: matricula.curp,
                    lugarNacimiento: matricula.lugarNacimiento,
                    nombre: matricula.nombre,
                    primerApellido: matricula.primerApellido,
                    segundoApellido: matricula.segundoApellido,
                    seguro: matricula.seguro,
                    genero: matricula.genero,
                    celular: matricula.celular,
                    correo: matricula.correo,
                    indigena: matricula.indigena
                };
                idEstudiante = yield (0, DimEstudianteServices_1.setEstudianteData)(nuevoEstudiante);
            }
            // Obtener las IDs correspondientes para carrera, modalidad, etc.
            const [idCarrera, idModalidad, idEstudio, idProcedencia, idUnidadReal, idUnidadOficial, idDiscapacidad] = yield Promise.all([
                (0, DimCarreraServices_1.getIdCarreraData)(matricula.carrera),
                (0, DimModalidadServices_1.getIdModalidadData)(matricula.modalidad),
                (0, DimEstudiosServices_1.getIdEstudioData)(matricula.estudios),
                (0, DimProcedenciaServices_1.getIdProcedenciaData)({ municipio: matricula.municipio, estado: matricula.entidad }),
                (0, DimUnidadServices_1.getIdUnidadData)(matricula.nombreUReal),
                (0, DimUnidadServices_1.getIdUnidadData)(matricula.nombreUOficial),
                (0, DimDiscapacidadServices_1.getIdDiscapacidadData)(matricula.discapacidad)
            ]);
            // Insertar nueva matrícula
            const nuevaMatricula = {
                idEstudiante: idEstudiante,
                idCarrera: idCarrera,
                idModalidad: idModalidad,
                idEstudio: idEstudio,
                idProcedencia: idProcedencia,
                idUnidadReal: idUnidadReal,
                idUnidadOficial: idUnidadOficial,
                idDiscapacidad: idDiscapacidad,
                idFechaInicio: idFechaActual,
                idFechaTermino: null,
                semestre: matricula.semestre,
                status: matricula.status
            };
            yield (0, exports.setMatricula)(nuevaMatricula);
        }));
        yield Promise.all(operaciones);
    }
    return {
        matriculaCoreLength: matriculaCore === null || matriculaCore === void 0 ? void 0 : matriculaCore.length
    };
});
exports.insertarNuevasMatriculas = insertarNuevasMatriculas;
const compareMatricula = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const [matriculaCore, matriculaData, idFechaActual] = yield Promise.all([
        (0, exports.getMatriculaCore)(),
        (0, exports.getMatriculaData)(),
        (0, DimFechaServices_1.getFechaAct)()
    ]);
    const matriculaDataMap = new Map(matriculaData === null || matriculaData === void 0 ? void 0 : matriculaData.map(data => [data.nocontrol, data]));
    const diferenciasMap = {};
    const matriculaNueva = (_a = matriculaCore === null || matriculaCore === void 0 ? void 0 : matriculaCore.filter(coreStudent => {
        const matchingStudent = matriculaDataMap.get(coreStudent.nocontrol);
        if (!matchingStudent) {
            console.log(`Estudiante nuevo: ${coreStudent.nocontrol} - No encontrado en matriculaData`);
            return true;
        }
        const fieldsEstudiante = ['lugarNacimiento', 'nombre', 'primerApellido', 'segundoApellido', 'genero', 'indigena', 'status'];
        const fieldsDimensiones = ['carrera', 'modalidad', 'nombreUReal', 'nombreUOficial'];
        const fieldsMatricula = ['semestre', 'status'];
        const diferenciasEstudiante = fieldsEstudiante.some(field => coreStudent[field] !== matchingStudent[field]);
        const diferenciasDimensiones = fieldsDimensiones.some(field => coreStudent[field] !== matchingStudent[field]);
        const diferenciasMatricula = fieldsMatricula.some(field => coreStudent[field] !== matchingStudent[field]);
        diferenciasMap[coreStudent.nocontrol] = { diferenciasEstudiante, diferenciasDimensiones, diferenciasMatricula };
        return diferenciasEstudiante || diferenciasDimensiones || diferenciasMatricula;
    })) !== null && _a !== void 0 ? _a : [];
    if ((matriculaNueva === null || matriculaNueva === void 0 ? void 0 : matriculaNueva.length) > 0) {
        const operaciones = matriculaNueva.map((matricula) => __awaiter(void 0, void 0, void 0, function* () {
            const matchingStudent = matriculaDataMap.get(matricula.nocontrol);
            const diferencias = diferenciasMap[matricula.nocontrol] || { diferenciasEstudiante: false, diferenciasDimensiones: false, diferenciasMatricula: false };
            let idEstudiante = null;
            if (!matchingStudent || diferencias.diferenciasEstudiante) {
                const nuevoEstudiante = {
                    nocontrol: matricula.nocontrol,
                    curp: matricula.curp,
                    lugarNacimiento: matricula.lugarNacimiento,
                    nombre: matricula.nombre,
                    primerApellido: matricula.primerApellido,
                    segundoApellido: matricula.segundoApellido,
                    seguro: matricula.seguro,
                    genero: matricula.genero,
                    celular: matricula.celular,
                    correo: matricula.correo,
                    indigena: matricula.indigena
                };
                idEstudiante = yield (0, DimEstudianteServices_1.setEstudianteData)(nuevoEstudiante);
            }
            else {
                idEstudiante = yield (0, DimEstudianteServices_1.getIdEstudianteData)(matchingStudent.nocontrol);
                if (diferencias.diferenciasEstudiante || diferencias.diferenciasDimensiones || diferencias.diferenciasMatricula) {
                    yield (0, exports.updateMatriculaFechaTermino)(idEstudiante, idFechaActual);
                }
            }
            const [idCarrera, idModalidad, idEstudio, idProcedencia, idUnidadReal, idUnidadOficial, idDiscapacidad] = yield Promise.all([
                (0, DimCarreraServices_1.getIdCarreraData)(matricula.carrera),
                (0, DimModalidadServices_1.getIdModalidadData)(matricula.modalidad),
                (0, DimEstudiosServices_1.getIdEstudioData)(matricula.estudios),
                (0, DimProcedenciaServices_1.getIdProcedenciaData)({ municipio: matricula.municipio, estado: matricula.entidad }),
                (0, DimUnidadServices_1.getIdUnidadData)(matricula.nombreUReal),
                (0, DimUnidadServices_1.getIdUnidadData)(matricula.nombreUOficial),
                (0, DimDiscapacidadServices_1.getIdDiscapacidadData)(matricula.discapacidad)
            ]);
            const nuevaMatricula = {
                idEstudiante: idEstudiante,
                idCarrera: idCarrera,
                idModalidad: idModalidad,
                idEstudio: idEstudio,
                idProcedencia: idProcedencia,
                idUnidadReal: idUnidadReal,
                idUnidadOficial: idUnidadOficial,
                idDiscapacidad: idDiscapacidad,
                idFechaInicio: idFechaActual,
                idFechaTermino: null,
                semestre: matricula.semestre,
                status: matricula.status
            };
            yield (0, exports.setMatricula)(nuevaMatricula);
        }));
        yield Promise.all(operaciones); // Procesar todas las operaciones en paralelo
    }
    const t = yield connection_1.dataDB.transaction();
    try {
        const duplicados = yield getDuplicados();
        yield Promise.all(duplicados.map((duplicado) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, exports.updateMatriculaFechaTermino)(duplicado.idEstudiante, idFechaActual);
            console.log(`Duplicado ${duplicado.idEstudiante}`);
        })));
        yield t.commit();
    }
    catch (error) {
        yield t.rollback();
        throw error;
    }
    return {
        matriculaCoreLength: matriculaCore === null || matriculaCore === void 0 ? void 0 : matriculaCore.length,
        matriculaDataLength: matriculaData === null || matriculaData === void 0 ? void 0 : matriculaData.length,
        matriculaNuevaLength: matriculaNueva === null || matriculaNueva === void 0 ? void 0 : matriculaNueva.length
    };
});
exports.compareMatricula = compareMatricula;
const getDuplicados = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.dataDB.query(matriculaQueries_1.queries.getDuplicados, {
        type: sequelize_1.QueryTypes.SELECT
    });
    return result;
});
const getMatricula = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, exports.compareMatricula)();
    return result;
});
exports.getMatricula = getMatricula;
const getMatriculaUnidadRealF = (fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(fechaInicio, fechaFin);
        const ids = idsRes.map(item => item.idFecha);
        console.log(ids);
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaUnidadRealF, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ids: ids
            }
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
});
exports.getMatriculaUnidadRealF = getMatriculaUnidadRealF;
const getMatriculaUnidadOficialF = (fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(fechaInicio, fechaFin);
        const ids = idsRes.map(item => item.idFecha);
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaUnidadOficialF, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                ids: ids
            }
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
});
exports.getMatriculaUnidadOficialF = getMatriculaUnidadOficialF;
const getMatriculaUnidadReal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaUnidadReal, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
});
exports.getMatriculaUnidadReal = getMatriculaUnidadReal;
const getMatriculaUnidadRealClase = (clase) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaUnidadRealClase, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                clase: clase
            }
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
});
exports.getMatriculaUnidadRealClase = getMatriculaUnidadRealClase;
const getMatriculaUnidadOficial = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaUnidadOficial, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
});
exports.getMatriculaUnidadOficial = getMatriculaUnidadOficial;
const getMatriculaOUnidad = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaOficial, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
});
exports.getMatriculaOUnidad = getMatriculaOUnidad;
const getMatriculaRUnidad = (unidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaReal, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
});
exports.getMatriculaRUnidad = getMatriculaRUnidad;
const getMatriculaRUnidadF = (unidad, fechaInicio, fechaFin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(fechaInicio, fechaFin);
        const ids = idsRes.map(item => item.idFecha);
        const matricula = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaRealF, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                unidad: unidad,
                ids: ids
            }
        });
        return matricula;
    }
    catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
});
exports.getMatriculaRUnidadF = getMatriculaRUnidadF;
const getEstatus = (unidad, carreras, inicio, fin, periodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ids = [];
        if (inicio && fin) {
            const idsRes = yield (0, DimFechaServices_1.getIdsFechas)(inicio, fin);
            ids = idsRes.map(item => item.idFecha);
        }
        const query = (0, matriculaQueries_1.getEstatusQuery)(unidad, carreras, ids.length > 0 ? ids : undefined);
        console.log(query);
        const replacements = {};
        let periodoActivo;
        !periodo ? periodoActivo = yield (0, DimFechaServices_1.getPeriodo)() : periodoActivo = periodo;
        replacements.periodo = periodoActivo;
        if (unidad)
            replacements.unidad = unidad;
        if (ids.length > 0)
            replacements.ids = ids;
        const results = yield connection_1.dataDB.query(query, {
            replacements,
            type: sequelize_1.QueryTypes.SELECT
        });
        return results;
    }
    catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
});
exports.getEstatus = getEstatus;
const getSemestre = (unidad, carreras, inicio, fin, periodo) => __awaiter(void 0, void 0, void 0, function* () {
    let ids = [];
    if (inicio && fin) {
        const resIds = yield (0, DimFechaServices_1.getIdsFechas)(inicio, fin);
        ids = resIds.map(item => item.idFecha);
    }
    let periodoActivo;
    !periodo ? periodoActivo = yield (0, DimFechaServices_1.getPeriodo)() : periodoActivo = periodo;
    const replacements = Object.assign(Object.assign(Object.assign({}, (carreras && { carreras })), (unidad && { unidad })), (ids.length > 0 && { ids }));
    replacements.periodo = periodoActivo;
    const query = (0, matriculaQueries_1.getSemestreQuery)(unidad, carreras, ids);
    try {
        const results = yield connection_1.dataDB.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements
        });
        return results;
    }
    catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
});
exports.getSemestre = getSemestre;
const getMatriculaRealCorte = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield connection_1.dataDB.query(matriculaQueries_1.queries.getMatriculaRealCorte, {
            type: sequelize_1.QueryTypes.SELECT
        });
        return results;
    }
    catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
});
exports.getMatriculaRealCorte = getMatriculaRealCorte;
const getMatriculaRealTotal = (unidad, inicio, fin, periodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ids = [];
        if (inicio && fin) {
            const resIds = yield (0, DimFechaServices_1.getIdsFechas)(inicio, fin);
            ids = resIds.map(item => item.idFecha);
        }
        const query = (0, matriculaQueries_1.getTotalQuery)(ids, unidad);
        const replacements = {};
        let periodoActivo;
        !periodo ? periodoActivo = yield (0, DimFechaServices_1.getPeriodo)() : periodoActivo = periodo;
        replacements.periodo = periodoActivo;
        if (unidad)
            replacements.unidad = unidad;
        if (ids.length > 0)
            replacements.ids = ids;
        const results = yield connection_1.dataDB.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements
        });
        return results;
    }
    catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
});
exports.getMatriculaRealTotal = getMatriculaRealTotal;
const getMatriculaPeriodo = (unidad, inicio, fin, periodo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ids = [];
        if (inicio && fin) {
            const resIds = yield (0, DimFechaServices_1.getIdsFechas)(inicio, fin);
            ids = resIds.map(item => item.idFecha);
        }
        let periodoActivo;
        if (!periodo) {
            periodoActivo = yield (0, DimFechaServices_1.getPeriodo)();
        }
        else {
            periodoActivo = periodo;
        }
        const query = (0, matriculaQueries_1.getPeriodoQuery)(ids, unidad);
        const replacements = {};
        replacements.periodo = periodoActivo;
        if (unidad)
            replacements.unidad = unidad;
        if (ids.length > 0)
            replacements.ids = ids;
        const results = yield connection_1.dataDB.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements
        });
        return results;
    }
    catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
});
exports.getMatriculaPeriodo = getMatriculaPeriodo;
