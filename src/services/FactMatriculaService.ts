import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/matriculaQueries';
import { MatriculaType } from '../models/matriculaModel';
import { MatriculaDataType } from '../models/matriculaDataModel';
import { EstudianteType } from '../models/estudianteModel';
import { getIdEstudianteData, setEstudianteData } from './DimEstudianteServices';
import { getIdCarreraData } from './DimCarreraServices';
import { getIdModalidadData } from './DimModalidadServices';
import { getIdEstudioData } from './DimEstudiosServices';
import { getIdProcedenciaData } from './DimProcedenciaServices';
import { ProcedenciaType } from '../models/procedenciaModel';
import { getIdUnidadData } from './DimUnidadServices';
import { getFechaAct } from './DimFechaServices';
import { getIdDiscapacidadData } from './DimDiscapacidadServices';

type MatriculaKeys = keyof MatriculaType;

export const getMatriculaCore = async (): Promise<MatriculaType[] | undefined> => {
    try {
        const matricula = await coreDB.query(queries.getMatriculaCore, {
            type: QueryTypes.SELECT
        }) as MatriculaType[];
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getMatriculaData = async (): Promise<MatriculaType[] | undefined> => {
    try {
        const matricula = await dataDB.query(queries.getMatriculaData, {
            type: QueryTypes.SELECT
        }) as MatriculaType[];
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
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
                estatus: matricula.estatus
            }
        });
        return result;
    } catch (error) {
        console.error("Error al INSERTAR la Matricula:", error);
        throw error;
    }
};

export const updateMatriculaFechaTermino = async (idEstudianteM: string | null, idFecha: string | null) => {
    try {
        const matricula = await dataDB.query(queries.upMatriculaFechaTermino, {
            type: QueryTypes.UPDATE,
            replacements: {
                idEstudiante: idEstudianteM,
                idFecha: idFecha
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const compareMatricula = async () => {
    const matriculaCore = await getMatriculaCore();
    const matriculaData = await getMatriculaData();

    const matriculaNueva = matriculaCore?.filter(coreStudent => {
        const matchingStudent = matriculaData?.find(dataStudent => dataStudent.nocontrol === coreStudent.nocontrol);
        if (!matchingStudent) {
            console.log(`Estudiante nuevo: ${coreStudent.nocontrol} - No encontrado en matriculaData`);
            return true;
        }

        const diferencias: Record<string, { core: any, matching: any }> = {};

        const fieldsToCompare: MatriculaKeys[] = [
            'curp',
            'lugarNacimiento',
            'nombre',
            'primerApellido',
            'segundoApellido',
            'genero',
            'indigena',
            'carrera',
            'modalidad',
            'nombreUReal',
            'nombreUOficial',
            'status'
        ];

        fieldsToCompare.forEach(field => {
            const coreValue = (coreStudent[field] as string).trim().toLowerCase();
            const matchingValue = (matchingStudent[field] as string).trim().toLowerCase();
        
            if (coreValue !== matchingValue) {
                diferencias[field] = { core: coreStudent[field], matching: matchingStudent[field] };
            }
        });
        
        if (Object.keys(diferencias).length > 0) {
            console.log(`Diferencias encontradas para el estudiante con nocontrol ${coreStudent.nocontrol}:`, diferencias);
            return true;
        }

        if (coreStudent.semestre !== matchingStudent.semestre) {
            diferencias.semestre = { core: coreStudent.semestre, matching: matchingStudent.semestre };
        }
        return false;
    });

    if (matriculaNueva && matriculaNueva.length > 0) {
        for (const matricula of matriculaNueva) {
            const matchingStudent = matriculaData?.find(dataStudent => dataStudent.nocontrol === matricula.nocontrol);
            if (matchingStudent) {
                const idFechaTermino = await getFechaAct();
                const idEstudianteMatch = await getIdEstudianteData(matchingStudent.nocontrol);
                await updateMatriculaFechaTermino(idEstudianteMatch, idFechaTermino);
            }

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

            let idEstudiante = await getIdEstudianteData(nuevoEstudiante.nocontrol);
            if (!idEstudiante || idEstudiante.length === 0) {
                const res = await setEstudianteData(nuevoEstudiante);
                idEstudiante = res;
            }

            const idCarrera = await getIdCarreraData(matricula.carrera);
            const idModalidad = await getIdModalidadData(matricula.modalidad);
            const idEstudio = await getIdEstudioData(matricula.estudios);

            const procedencia: ProcedenciaType = {
                municipio: matricula.municipio,
                estado: matricula.entidad
            };

            const idProcedencia = await getIdProcedenciaData(procedencia);
            const idUnidadReal = await getIdUnidadData(matricula.nombreUReal);
            const idUnidadOficial = await getIdUnidadData(matricula.nombreUOficial);
            const idDiscapacidad = await getIdDiscapacidadData(matricula.discapacidad);
            const idFechaInicio = await getFechaAct();

            const nuevaMatricula: MatriculaDataType = {
                idEstudiante: idEstudiante,
                idCarrera: idCarrera,
                idModalidad: idModalidad,
                idEstudio: idEstudio,
                idProcedencia: idProcedencia,
                idUnidadReal: idUnidadReal,
                idUnidadOficial: idUnidadOficial,
                idDiscapacidad: idDiscapacidad,
                idFechaInicio: idFechaInicio,
                idFechaTermino: null,
                semestre: matricula.semestre,
                estatus: matricula.status
            };

            const result = await setMatricula(nuevaMatricula);
            console.log(result);
        }
    }

    const resultado = {
        matriculaCoreLength: matriculaCore?.length,
        matriculaDataLength: matriculaData?.length,
        matriculaNuevaLength: matriculaNueva?.length
    };
    return resultado;
};

export const getMatricula = async () => {
    const result = await compareMatricula();
    return result;
};

export const getMatriculaUnidadReal = async ()=> {
    try {
        const matricula = await dataDB.query(queries.getMatriculaUnidadReal, {
            type: QueryTypes.SELECT
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getMatriculaUnidadOficial = async ()=> {
    try {
        const matricula = await dataDB.query(queries.getMatriculaUnidadOficial, {
            type: QueryTypes.SELECT
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getMatriculaOUnidad = async (unidad: string)=> {
    try {

        const matricula = await dataDB.query(queries.getMatriculaOficial, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            } 
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};

export const getMatriculaRUnidad = async (unidad: string)=> {
    try {

        const matricula = await dataDB.query(queries.getMatriculaReal, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            } 
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
};