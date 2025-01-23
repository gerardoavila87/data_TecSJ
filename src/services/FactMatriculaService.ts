import { coreDB, dataDB, coreBackupDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries, getEstatusQuery, getSemestreQuery, getTotalQuery, getPeriodoQuery } from '../database/matriculaQueries';
import { MatriculaType } from '../models/matriculaModel';
import { MatriculaDataType } from '../models/matriculaDataModel';
import { EstudianteType } from '../models/estudianteModel';
import { getIdEstudianteData, setEstudianteData } from './DimEstudianteServices';
import { getIdCarreraData } from './DimCarreraServices';
import { getIdModalidadData } from './DimModalidadServices';
import { getIdEstudioData } from './DimEstudiosServices';
import { getIdProcedenciaData } from './DimProcedenciaServices';
import { getIdUnidadData } from './DimUnidadServices';
import { getFechaAct, getIdsFechas, getPeriodo } from './DimFechaServices';
import { getIdDiscapacidadData } from './DimDiscapacidadServices';

type MatriculaKeys = keyof MatriculaType;

interface FechaId {
    idFecha: number;
}

export const getMatriculaCore = async (): Promise<MatriculaType[] | undefined> => {
    try {
        const matricula = await coreDB.query(queries.getMatriculaCore, {
            type: QueryTypes.SELECT
        }) as MatriculaType[];
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta Core:", error);
        throw error;
    }
};

export const getMatriculaCoreBackup = async (): Promise<MatriculaType[] | undefined> => {
    try {
        const matricula = await coreBackupDB.query(queries.getMatriculaCoreBackup, {
            type: QueryTypes.SELECT
        }) as MatriculaType[];
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta CoreBackup:", error);
        throw error;
    }
};

export const getMatriculaData = async (): Promise<MatriculaType[] | undefined> => {
    try {
        const periodo = await getPeriodo();
        const matricula = await dataDB.query(queries.getMatriculaData, {
            type: QueryTypes.SELECT,
            replacements: {
                periodo: periodo
            }
        }) as MatriculaType[];
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta Data:", error);
        throw error;
    }
};

export const setMatricula = async (matricula: MatriculaDataType) => {
    try {
        const result = await dataDB.query(queries.setMatricula, {
            type: QueryTypes.INSERT,
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
    } catch (error) {
        console.error("Error al INSERTAR la Matricula:", error);
        throw error;
    }
};

export const updateMatriculaFechaTermino = async (idEstudiante: string | null, idFecha: string | null) => {
    try {
        const periodo = await getPeriodo();
        const idMatricula = await dataDB.query(queries.getUltimaMatriculaEstudiante, {
            type: QueryTypes.SELECT,
            replacements: {
                idEstudiante: idEstudiante,
                periodo: periodo
            }
        }) as any[];
        const matricula = await dataDB.query(queries.upMatriculaFechaTermino, {
            type: QueryTypes.UPDATE,
            replacements: {
                idMatricula: idMatricula[0].matricula,
                idFecha: idFecha
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const insertarNuevasMatriculas = async () => {
    const [matriculaCore, idFechaActual] = await Promise.all([
        getMatriculaCoreBackup(),
        '32'
    ]);

    if (matriculaCore && matriculaCore?.length > 0) {
        const operaciones = matriculaCore.map(async matricula => {
            // Verificar si el estudiante ya existe en la base de datos
            let idEstudiante = await getIdEstudianteData(matricula.nocontrol);

            if (!idEstudiante) {
                // Si el estudiante no existe, insertarlo
                const nuevoEstudiante: EstudianteType = {
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
                idEstudiante = await setEstudianteData(nuevoEstudiante);
            }

            // Obtener las IDs correspondientes para carrera, modalidad, etc.
            const [idCarrera, idModalidad, idEstudio, idProcedencia, idUnidadReal, idUnidadOficial, idDiscapacidad] = await Promise.all([
                getIdCarreraData(matricula.carrera),
                getIdModalidadData(matricula.modalidad),
                getIdEstudioData(matricula.estudios),
                getIdProcedenciaData({ municipio: matricula.municipio, estado: matricula.entidad }),
                getIdUnidadData(matricula.nombreUReal),
                getIdUnidadData(matricula.nombreUOficial),
                getIdDiscapacidadData(matricula.discapacidad)
            ]);

            // Insertar nueva matrícula
            const nuevaMatricula: MatriculaDataType = {
                idEstudiante: idEstudiante!,
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

            await setMatricula(nuevaMatricula);
        });
        await Promise.all(operaciones);
    }

    return {
        matriculaCoreLength: matriculaCore?.length
    };
};

export const compareMatricula = async () => {
    const [matriculaCore, matriculaData, idFechaActual] = await Promise.all([
        getMatriculaCore(),
        getMatriculaData(),
        getFechaAct()
    ]);

    const matriculaDataMap = new Map(matriculaData?.map(data => [data.nocontrol, data]));

    const matriculaNueva = matriculaCore?.filter(coreStudent => !matriculaDataMap.has(coreStudent.nocontrol)) ?? [];
    const estudiantesModificados = matriculaCore?.filter(coreStudent => {
        const matchingStudent = matriculaDataMap.get(coreStudent.nocontrol);
        return matchingStudent && (
            coreStudent.curp !== matchingStudent.curp ||
            coreStudent.lugarNacimiento !== matchingStudent.lugarNacimiento ||
            coreStudent.nombre !== matchingStudent.nombre ||
            coreStudent.primerApellido !== matchingStudent.primerApellido ||
            coreStudent.segundoApellido !== matchingStudent.segundoApellido ||
            coreStudent.seguro !== matchingStudent.seguro ||
            coreStudent.genero !== matchingStudent.genero ||
            coreStudent.celular !== matchingStudent.celular ||
            coreStudent.correo !== matchingStudent.correo ||
            coreStudent.indigena !== matchingStudent.indigena
        );
    }) ?? [];
    const estudiantesModificadosSet = new Set(estudiantesModificados.map(est => est.nocontrol));

    const matriculaModificada = matriculaCore?.filter(coreStudent => {
        const matchingStudent = matriculaDataMap.get(coreStudent.nocontrol);
        return matchingStudent && !estudiantesModificadosSet.has(coreStudent.nocontrol) && (
            coreStudent.carrera !== matchingStudent.carrera ||
            coreStudent.modalidad !== matchingStudent.modalidad ||
            //coreStudent.estudios !== matchingStudent.estudios ||
            //coreStudent.entidad !== matchingStudent.entidad ||
            //coreStudent.municipio !== matchingStudent.municipio ||
            coreStudent.nombreUReal !== matchingStudent.nombreUReal ||
            coreStudent.nombreUOficial !== matchingStudent.nombreUOficial ||
            //coreStudent.discapacidad !== matchingStudent.discapacidad ||
            coreStudent.semestre !== matchingStudent.semestre ||
            coreStudent.status !== matchingStudent.status
        );
    }) ?? [];

    console.log(`Nuevas matrículas: ${matriculaNueva.length}`);
    console.log(`Estudiantes modificados: ${estudiantesModificados.length}`);
    console.log(`Matrículas modificadas: ${matriculaModificada.length}`);

    if (matriculaNueva?.length > 0) {
        await procesarMatriculaNueva(matriculaNueva, idFechaActual);
    }
    if (estudiantesModificados?.length > 0) {
        await procesarEstudiantesModificados(estudiantesModificados, idFechaActual);
    }
    if (matriculaModificada?.length > 0) {
        await procesarMatriculaModificada(matriculaModificada, idFechaActual);
    }

    const t = await dataDB.transaction();
    let dup;
    try {
        const duplicados = await getDuplicados() as any[];
        dup = duplicados;
        await Promise.all(duplicados.map(async duplicado => {
            await updateMatriculaFechaTermino(duplicado.idEstudiante, idFechaActual);
            console.log(`Duplicado ${duplicado.idEstudiante}`);
        }));
        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }
    console.log(dup.length);
    console.log("Procesamiento completado");
};

export const procesarMatriculaNueva = async (matriculaNueva: any[], idFechaActual: string) => {
    const operaciones = matriculaNueva.map(async matricula => {
        const nuevoEstudiante: EstudianteType = {
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

        const idEstudiante = await setEstudianteData(nuevoEstudiante);

        const [idCarrera, idModalidad, idEstudio, idProcedencia, idUnidadReal, idUnidadOficial, idDiscapacidad] = await Promise.all([
            getIdCarreraData(matricula.carrera),
            getIdModalidadData(matricula.modalidad),
            getIdEstudioData(matricula.estudios),
            getIdProcedenciaData({ municipio: matricula.municipio, estado: matricula.entidad }),
            getIdUnidadData(matricula.nombreUReal),
            getIdUnidadData(matricula.nombreUOficial),
            getIdDiscapacidadData(matricula.discapacidad)
        ]);

        const nuevaMatricula: MatriculaDataType = {
            idEstudiante: idEstudiante!,
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

        await setMatricula(nuevaMatricula);
    });

    await Promise.all(operaciones);
};

export const procesarMatriculaModificada = async (matriculaModificada: any[], idFechaActual: string) => {
    const operaciones = matriculaModificada.map(async matricula => {
        const idEstudiante = await getIdEstudianteData(matricula.nocontrol);
        if (idEstudiante) {
            await updateMatriculaFechaTermino(idEstudiante, idFechaActual);
        }
        const [idCarrera, idModalidad, idEstudio, idProcedencia, idUnidadReal, idUnidadOficial, idDiscapacidad] = await Promise.all([
            getIdCarreraData(matricula.carrera),
            getIdModalidadData(matricula.modalidad),
            getIdEstudioData(matricula.estudios),
            getIdProcedenciaData({ municipio: matricula.municipio, estado: matricula.entidad }),
            getIdUnidadData(matricula.nombreUReal),
            getIdUnidadData(matricula.nombreUOficial),
            getIdDiscapacidadData(matricula.discapacidad)
        ]);

        const nuevaMatricula: MatriculaDataType = {
            idEstudiante: idEstudiante!,
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
        await setMatricula(nuevaMatricula);
    });

    await Promise.all(operaciones);
};

export const procesarEstudiantesModificados = async (estudiantesModificados: any[], idFechaActual: string) => {
    const operaciones = estudiantesModificados.map(async estudiante => {
        const idEstudianteAnterior = await getIdEstudianteData(estudiante.nocontrol);
        if (idEstudianteAnterior) {
            await updateMatriculaFechaTermino(idEstudianteAnterior, idFechaActual);
        }

        const nuevoEstudiante: EstudianteType = {
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
        };

        const idEstudianteNuevo = await setEstudianteData(nuevoEstudiante);

        const [idCarrera, idModalidad, idEstudio, idProcedencia, idUnidadReal, idUnidadOficial, idDiscapacidad] = await Promise.all([
            getIdCarreraData(estudiante.carrera),
            getIdModalidadData(estudiante.modalidad),
            getIdEstudioData(estudiante.estudios),
            getIdProcedenciaData({ municipio: estudiante.municipio, estado: estudiante.entidad }),
            getIdUnidadData(estudiante.nombreUReal),
            getIdUnidadData(estudiante.nombreUOficial),
            getIdDiscapacidadData(estudiante.discapacidad)
        ]);

        const nuevaMatricula: MatriculaDataType = {
            idEstudiante: idEstudianteNuevo!,
            idCarrera: idCarrera,
            idModalidad: idModalidad,
            idEstudio: idEstudio,
            idProcedencia: idProcedencia,
            idUnidadReal: idUnidadReal,
            idUnidadOficial: idUnidadOficial,
            idDiscapacidad: idDiscapacidad,
            idFechaInicio: idFechaActual,
            idFechaTermino: null,
            semestre: estudiante.semestre,
            status: estudiante.status
        };

        await setMatricula(nuevaMatricula);
    });

    await Promise.all(operaciones);
};


/*
export const compareMatricula = async () => {
    const [matriculaCore, matriculaData, idFechaActual] = await Promise.all([
        getMatriculaCore(),
        getMatriculaData(),
        getFechaAct()
    ]);

    const matriculaDataMap = new Map(matriculaData?.map(data => [data.nocontrol, data]));

    const diferenciasMap: Record<string, { diferenciasEstudiante: boolean, diferenciasDimensiones: boolean, diferenciasMatricula: boolean }> = {};

    const matriculaNueva = matriculaCore?.filter(coreStudent => {
        const matchingStudent = matriculaDataMap.get(coreStudent.nocontrol);

        if (!matchingStudent) {
            console.log(`Estudiante nuevo: ${coreStudent.nocontrol} - No encontrado en matriculaData`);
            return true;
        }

        const fieldsEstudiante: (keyof typeof coreStudent)[] = ['lugarNacimiento', 'nombre', 'primerApellido', 'segundoApellido', 'genero', 'indigena'];
        const fieldsDimensiones: (keyof typeof coreStudent)[] = ['carrera', 'modalidad', 'nombreUReal', 'nombreUOficial', 'entidad', 'municipio'];
        const fieldsMatricula: (keyof typeof coreStudent)[] = ['semestre', 'status'];

        const diferenciasEstudiante = fieldsEstudiante.some(field => coreStudent[field] !== matchingStudent[field]);
        const diferenciasDimensiones = fieldsDimensiones.some(field => coreStudent[field] !== matchingStudent[field]);
        const diferenciasMatricula = fieldsMatricula.some(field => coreStudent[field] !== matchingStudent[field]);

        diferenciasMap[coreStudent.nocontrol] = { diferenciasEstudiante, diferenciasDimensiones, diferenciasMatricula };

        return diferenciasEstudiante || diferenciasDimensiones || diferenciasMatricula;
    }) ?? [];

    if (matriculaNueva?.length > 0) {
        const operaciones = matriculaNueva.map(async matricula => {
            const matchingStudent = matriculaDataMap.get(matricula.nocontrol);

            const diferencias = diferenciasMap[matricula.nocontrol] || { diferenciasEstudiante: false, diferenciasDimensiones: false, diferenciasMatricula: false };
            let idEstudiante = null;

            if (!matchingStudent || diferencias.diferenciasEstudiante) {
                const nuevoEstudiante: EstudianteType = {
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
                idEstudiante = await setEstudianteData(nuevoEstudiante);
            } else {
                idEstudiante = await getIdEstudianteData(matchingStudent.nocontrol);
                if (diferencias.diferenciasEstudiante || diferencias.diferenciasDimensiones || diferencias.diferenciasMatricula) {
                    await updateMatriculaFechaTermino(idEstudiante, idFechaActual);
                }
            }

            const [idCarrera, idModalidad, idEstudio, idProcedencia, idUnidadReal, idUnidadOficial, idDiscapacidad] = await Promise.all([
                getIdCarreraData(matricula.carrera),
                getIdModalidadData(matricula.modalidad),
                getIdEstudioData(matricula.estudios),
                getIdProcedenciaData({ municipio: matricula.municipio, estado: matricula.entidad }),
                getIdUnidadData(matricula.nombreUReal),
                getIdUnidadData(matricula.nombreUOficial),
                getIdDiscapacidadData(matricula.discapacidad)
            ]);

            const nuevaMatricula: MatriculaDataType = {
                idEstudiante: idEstudiante!,
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

            await setMatricula(nuevaMatricula);
        });

        await Promise.all(operaciones); // Procesar todas las operaciones en paralelo
    }

    const t = await dataDB.transaction();
    let dup;
    try {
        const duplicados = await getDuplicados() as any[];
        dup = duplicados;
        await Promise.all(duplicados.map(async duplicado => {
            await updateMatriculaFechaTermino(duplicado.idEstudiante, idFechaActual);
            console.log(`Duplicado ${duplicado.idEstudiante}`);
        }));
        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }
    console.log(dup.length);
    return {
        matriculaCoreLength: matriculaCore?.length,
        matriculaDataLength: matriculaData?.length,
        matriculaNuevaLength: matriculaNueva?.length
    };
};*/

export const getDuplicados = async () => {
    const periodo = await getPeriodo();
    const result = await dataDB.query(queries.getDuplicados, {
        type: QueryTypes.SELECT,
        replacements: {
            periodo: periodo
        }
    });
    return result;
}

export const getMatricula = async () => {
    const result = await compareMatricula();
    return result;
};

export const getMatriculaUnidadRealF = async (fechaInicio: string, fechaFin: string) => {
    try {
        const idsRes = await getIdsFechas(fechaInicio, fechaFin) as FechaId[];
        const ids = idsRes.map(item => item.idFecha);
        console.log(ids);
        const periodo = await getPeriodo();
        const matricula = await dataDB.query(queries.getMatriculaUnidadRealF, {
            type: QueryTypes.SELECT,
            replacements: {
                ids: ids,
                periodo: periodo
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getMatriculaUnidadOficialF = async (fechaInicio: string, fechaFin: string) => {
    try {
        const idsRes = await getIdsFechas(fechaInicio, fechaFin) as FechaId[];
        const ids = idsRes.map(item => item.idFecha);
        const matricula = await dataDB.query(queries.getMatriculaUnidadOficialF, {
            type: QueryTypes.SELECT,
            replacements: {
                ids: ids
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getMatriculaUnidadReal = async (periodo?: string) => {
    try {
        let periodoActivo;
        !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;
        const matricula = await dataDB.query(queries.getMatriculaUnidadReal, {
            type: QueryTypes.SELECT,
            replacements: {
                periodo: periodoActivo
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};
export const getMatriculaUnidadRealClase = async (clase: string) => {
    try {
        const periodo = await getPeriodo();
        const matricula = await dataDB.query(queries.getMatriculaUnidadRealClase, {
            type: QueryTypes.SELECT,
            replacements: {
                clase: clase,
                periodo: periodo
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};
export const getMatriculaUnidadOficial = async () => {
    try {
        const periodo = await getPeriodo();
        const matricula = await dataDB.query(queries.getMatriculaUnidadOficial, {
            type: QueryTypes.SELECT,
            replacements: {
                periodo: periodo
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getMatriculaOUnidad = async (unidad: string) => {
    try {
        const periodo = await getPeriodo();
        const matricula = await dataDB.query(queries.getMatriculaOficial, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad,
                periodo: periodo
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getMatriculaRUnidad = async (unidad: string) => {
    try {
        const periodo = await getPeriodo();
        const matricula = await dataDB.query(queries.getMatriculaReal, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad,
                periodo: periodo
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getMatriculaRUnidadF = async (unidad: string, fechaInicio: string, fechaFin: string) => {
    try {
        const idsRes = await getIdsFechas(fechaInicio, fechaFin) as FechaId[];
        const ids = idsRes.map(item => item.idFecha);
        const periodo = await getPeriodo();
        const matricula = await dataDB.query(queries.getMatriculaRealF, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad,
                ids: ids,
                periodo: periodo
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getEstatus = async (unidad?: string, carreras?: string, inicio?: string, fin?: string, periodo?: string) => {
    try {
        let ids: number[] = [];

        if (inicio && fin) {
            const idsRes = await getIdsFechas(inicio, fin) as FechaId[];
            ids = idsRes.map(item => item.idFecha);
        }

        const query = getEstatusQuery(unidad, carreras, ids.length > 0 ? ids : undefined);
        console.log(query);
        const replacements: any = {};
        let periodoActivo;
        !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;

        replacements.periodo = periodoActivo;
        if (unidad) replacements.unidad = unidad;
        if (ids.length > 0) replacements.ids = ids;

        const results = await dataDB.query(query, {
            replacements,
            type: QueryTypes.SELECT
        });

        return results;
    } catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
};

export const getSemestre = async (unidad?: string, carreras?: string, inicio?: string, fin?: string, periodo?: string) => {
    let ids: number[] = [];
    if (inicio && fin) {
        const resIds = await getIdsFechas(inicio, fin) as FechaId[];
        ids = resIds.map(item => item.idFecha)
    }

    let periodoActivo;
    !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;

    const replacements: any = {
        ...(carreras && { carreras }),
        ...(unidad && { unidad }),
        ...(ids.length > 0 && { ids })
    };
    replacements.periodo = periodoActivo;
    const query = getSemestreQuery(unidad, carreras, ids);
    try {
        const results = await dataDB.query(query, {
            type: QueryTypes.SELECT,
            replacements
        });
        return results;
    } catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
};

export const getMatriculaRealCorte = async () => {
    try {
        const results = await dataDB.query(queries.getMatriculaRealCorte, {
            type: QueryTypes.SELECT
        });
        return results;
    } catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
};

export const getMatriculaRealTotal = async (unidad?: string, inicio?: string, fin?: string, periodo?: string) => {
    try {
        let ids: number[] = [];

        if (inicio && fin) {
            const resIds = await getIdsFechas(inicio, fin) as FechaId[];
            ids = resIds.map(item => item.idFecha);
        }

        const query = getTotalQuery(ids, unidad);
        const replacements: any = {};

        let periodoActivo;
        !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;

        replacements.periodo = periodoActivo;
        if (unidad) replacements.unidad = unidad;
        if (ids.length > 0) replacements.ids = ids;

        const results = await dataDB.query(query, {
            type: QueryTypes.SELECT,
            replacements
        });

        return results;
    } catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
};

export const getMatriculaPeriodo = async (unidad?: string, inicio?: string, fin?: string, periodo?: string) => {
    try {
        let ids: number[] = [];

        if (inicio && fin) {
            const resIds = await getIdsFechas(inicio, fin) as FechaId[];
            ids = resIds.map(item => item.idFecha);
        }
        let periodoActivo;
        if (!periodo) {
            periodoActivo = await getPeriodo();
        } else {
            periodoActivo = periodo;
        }

        const query = getPeriodoQuery(ids, unidad);
        const replacements: any = {};
        console.log(query);

        replacements.periodo = periodoActivo;
        if (unidad) replacements.unidad = unidad;
        if (ids.length > 0) replacements.ids = ids;

        const results = await dataDB.query(query, {
            type: QueryTypes.SELECT,
            replacements
        });

        return results;
    } catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
};

export const getMatriculaVariacion = async (periodo?: string) => {
    try {
        let periodoActivo;
        if (!periodo) {
            periodoActivo = await getPeriodo();
        } else {
            periodoActivo = periodo;
        }
        let anio: number = parseInt(periodoActivo.substring(0, 4));
        let code = periodoActivo.substring(4).toUpperCase();
        anio = anio - 1;
        const periodoAnt = anio + code;
        const replacements: any = {};
        replacements.periodo_actual = periodoActivo;
        replacements.periodo_anterior = periodoAnt;

        const results = await dataDB.query(queries.getPeriodoVariacion, {
            type: QueryTypes.SELECT,
            replacements
        });

        return results;
    } catch (error) {
        throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
};