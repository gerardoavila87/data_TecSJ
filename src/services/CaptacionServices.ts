import { dataDB } from "../database/connection"
import { getCaptacion, queries } from "../database/captacionQueries";
import { QueryTypes } from 'sequelize';
import { getFechaAct, getPeriodo } from "./DimFechaServices";
import { BaseCaptacionType } from "../models/baseCaptacionModel";
import { DataCaptacionType } from "../models/dataCaptacionModel";
import { AspiranteType } from "../models/aspiranteModel";
import { getIdCarreraData } from "./DimCarreraServices";
import { getIdModalidadData } from "./DimModalidadServices";
import { getIdProcedenciaData } from "./DimProcedenciaServices";
import { getIdUnidadClave, getIdUnidadData } from "./DimUnidadServices";
import { getIdAspiranteData, setAspiranteData } from "./AspiranteServices";
import { getIdEstudioData } from "./DimEstudiosServices";
import { getIdDiscapacidadData } from "./DimDiscapacidadServices";
import { getIdEstatus } from "./EstatusCaptServices";

export const fetchCaptacion = async () => {
    try {
        return compareCaptacion();
    } catch (error) {
        console.error("Error durante la ejecución de la consulta Core:", error);
        throw error;
    }
}

export const getCaptacionCore = async () => {
    try {
        const captacion = await dataDB.query(queries.getCaptacionCore, {
            type: QueryTypes.SELECT
        }) as BaseCaptacionType[];
        return captacion;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta Core:", error);
        throw error;
    }
}

export const getCaptacionData = async () => {
    try {
        const captacion = await dataDB.query(queries.getCaptacionData, {
            type: QueryTypes.SELECT
        }) as BaseCaptacionType[];
        return captacion;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta Core:", error);
        throw error;
    }
}

export const updateCaptacionFechaTermino = async (idAspirante: string | null, idFecha: string | null) => {
    try {
        const idCaptacion = await dataDB.query(queries.getUltimaCaptacionAspirante, {
            type: QueryTypes.SELECT,
            replacements: {
                idAspirante: idAspirante
            }
        }) as any[];
        const matricula = await dataDB.query(queries.upCaptacionFechaTermino, {
            type: QueryTypes.UPDATE,
            replacements: {
                idCaptacion: idCaptacion[0].idCaptacion,
                idFecha: idFecha
            }
        });
        return matricula;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta:", error);
        throw error;
    }
}

export const setCaptacion = async (nuevaCaptacion: DataCaptacionType) => {
    try {
        const replacements = { ...nuevaCaptacion };

        const captacion = await dataDB.query(queries.setCaptacionData, {
            type: QueryTypes.INSERT,
            replacements
        });
        return captacion;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta Core:", error);
        throw error;
    }
};


export const getDuplicadosCaptacion = async () => {
    try {
        const captacion = await dataDB.query(queries.getDuplicados, {
            type: QueryTypes.SELECT
        }) as DataCaptacionType[];
        return captacion;
    } catch (error) {
        console.error("Error durante la ejecución de la consulta Core:", error);
        throw error;
    }
}

export const compareCaptacion = async () => {
    const [captacionCore, captacionData, idFechaActual] = await Promise.all([
        getCaptacionCore(),
        getCaptacionData(),
        getFechaAct()
    ]);

    const captacionDataMap = new Map(captacionData?.map(data => [data.curp, data]));

    const diferenciasMap: Record<string, { diferenciasAspirante: string[], diferenciasDimensiones: string[] }> = {};

    const captacionNueva = captacionCore?.filter(coreAspirante => {
        const matchingAspirante = captacionDataMap.get(coreAspirante.curp);

        if (!matchingAspirante) {
            console.log(`Aspirante nuevo: ${coreAspirante.curp} - No encontrado en captacionData`);
            return true;
        }
        const fieldsAspirante: (keyof typeof coreAspirante)[] = ['nombre', 'primerApellido', 'segundoApellido', 'lugarNacimiento'];
        const fieldsDimensiones: (keyof typeof coreAspirante)[] = ['carrera', 'modalidad', 'unidadReal', 'unidadOficial', 'pagoExamen',
            'pagoInscripcion', 'pagoInscripcion', 'docsEntregados', 'inscripcionCompleta', 'medioCaptacion', 'estatus', 'periodo'];

        // Almacenar las diferencias encontradas
        const diferenciasAspirante = fieldsAspirante.filter(field => coreAspirante[field] !== matchingAspirante[field]);
        const diferenciasDimensiones = fieldsDimensiones.filter(field => coreAspirante[field] !== matchingAspirante[field]);

        // Si hay diferencias, imprimir el aspirante y los campos con diferencias
        if (diferenciasAspirante.length > 0 || diferenciasDimensiones.length > 0) {
            console.log(`Diferencias encontradas para aspirante con CURP: ${coreAspirante.curp}`);
            if (diferenciasAspirante.length > 0) {
                console.log(`Diferencias en datos personales: ${diferenciasAspirante.join(', ')}`);
            }
            if (diferenciasDimensiones.length > 0) {
                console.log(`Diferencias en dimensiones: ${diferenciasDimensiones.join(', ')}`);
            }
        }

        diferenciasMap[coreAspirante.curp] = { diferenciasAspirante, diferenciasDimensiones };

        return diferenciasAspirante.length > 0 || diferenciasDimensiones.length > 0;
    }) ?? [];

    if (captacionNueva?.length > 0) {
        const operaciones = captacionNueva.map(async captacion => {
            const matchingAspirante = captacionDataMap.get(captacion.curp);
            const diferencias = diferenciasMap[captacion.curp] || { diferenciasAspirante: [], diferenciasDimensiones: [] };
            let idAspirante = null;

            if (!matchingAspirante || diferencias.diferenciasAspirante.length > 0) {
                const nuevoAspirante: AspiranteType = {
                    curp: captacion.curp,
                    nombre: captacion.nombre,
                    primerApellido: captacion.primerApellido,
                    segundoApellido: captacion.segundoApellido,
                    lugarNacimiento: captacion.lugarNacimiento,
                    genero: captacion.genero,
                    indigena: captacion.indigena
                };
                idAspirante = await setAspiranteData(nuevoAspirante);
            } else {
                idAspirante = await getIdAspiranteData(matchingAspirante.curp);
                if (diferencias.diferenciasAspirante.length > 0 || diferencias.diferenciasDimensiones.length > 0) {
                    await updateCaptacionFechaTermino(idAspirante, idFechaActual);
                }
            }

            const estadoLimpio = captacion.estado? captacion.estado.split('#')[1] : '';
            const [idCarrera, idModalidad, idProcedencia, idUnidadReal, idUnidadOficial, idEstudio, idDiscapacidad, idEstatus] = await Promise.all([
                getIdCarreraData(captacion.carrera),
                getIdModalidadData(captacion.modalidad),
                getIdProcedenciaData({ municipio: captacion.municipio, estado: estadoLimpio }),
                getIdUnidadData(captacion.unidadReal),
                getIdUnidadClave(captacion.unidadOficial),
                getIdEstudioData(captacion.estudios),
                getIdDiscapacidadData(captacion.discapacidad),
                getIdEstatus(captacion.estatus)
            ]);

            const nuevaCaptacion: DataCaptacionType = {
                idCaptacion: null,
                idAspirante: idAspirante ? Number(idAspirante) : null,
                idCarrera: idCarrera ? Number(idCarrera) : null,
                idModalidad: idModalidad ? Number(idModalidad) : null,
                idProcedencia: idProcedencia ? Number(idProcedencia) : null,
                idEstudio: idEstudio ? Number(idEstudio) : null,
                idDiscapacidad: idDiscapacidad ? Number(idDiscapacidad) : null,
                idEstatus: idEstatus ? idEstatus : null,
                idUnidadReal: idUnidadReal ? Number(idUnidadReal) : null,
                idUnidadOficial: idUnidadOficial ? Number(idUnidadOficial) : Number(idUnidadReal),
                idFechaInicio: idFechaActual ? Number(idFechaActual) : null,
                idFechaTermino: null,
                periodo: captacion.periodo,
                pagoExamen: captacion.pagoExamen,
                pagoInscripcion: captacion.pagoInscripcion,
                docsEntregados: captacion.docsEntregados,
                inscripcionCompleta: captacion.inscripcionCompleta,
                medioCaptacion: captacion.medioCaptacion
            };

            await setCaptacion(nuevaCaptacion);
        });

        await Promise.all(operaciones); // Procesar todas las operaciones en paralelo
    }

    // Manejo de duplicados en captación
    const t = await dataDB.transaction();
    try {
        const duplicados = await getDuplicadosCaptacion() as any[];

        await Promise.all(duplicados.map(async duplicado => {
            await updateCaptacionFechaTermino(duplicado.idAspirante, idFechaActual);
            console.log(`Duplicado ${duplicado.idAspirante}`);
        }));

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }

    return {
        captacionCoreLength: captacionCore?.length,
        captacionDataLength: captacionData?.length,
        captacionNuevaLength: captacionNueva?.length
    };
};

export const getAllCaptacion = async (filtro?: string, unidad?: string, carreras?: string, periodo?: string) => {
    try {
        let periodoActivo;
        !periodo ? periodoActivo = await getMaxPeriodo() : periodoActivo = periodo;

        const query = getCaptacion(filtro, unidad, carreras);
        const replacements: any = {
            unidad: unidad,
            carreras: carreras,
            periodo: periodoActivo
        };

        const result = await dataDB.query(query, {
            type: QueryTypes.SELECT,
            replacements
        }) as [];

        return result;
    } catch (error) {
        throw error;
    }
}

export const getCaptacionTotal = async (periodo?: string) => {
    try {
        let periodoActivo;
        !periodo ? periodoActivo = await getMaxPeriodo() : periodoActivo = periodo;
        const captacion = await dataDB.query(queries.getAllCaptacion, {
            type: QueryTypes.SELECT,
            replacements: {
                periodo: periodoActivo
            }
        });
        return captacion;
    } catch (error) {
        throw error;
    }
}

export const getMaxPeriodo = async () => {
    try {
        const periodo = await dataDB.query(queries.getMaxPeriodo, {
            type: QueryTypes.SELECT
        }) as { periodo: string }[];
        return periodo[0].periodo;
    } catch (error) {
        throw error;
    }
}

export const getCaptacionFecha = async (periodo?: string) => {
    try {
        let periodoActivo;
        !periodo ? periodoActivo = await getMaxPeriodo() : periodoActivo = periodo;
        const captacion = await dataDB.query(queries.getCaptacionFecha, {
            type: QueryTypes.SELECT,
            replacements: {
                periodo: periodoActivo
            }
        });
        return captacion;
    } catch (error) {
        throw error;
    }
}

export const getCaptacionExamen = async (periodo?: string) => {
    try {
        let periodoActivo;
        !periodo ? periodoActivo = await getMaxPeriodo() : periodoActivo = periodo;
        const captacion = await dataDB.query(queries.getCaptacionExamen, {
            type: QueryTypes.SELECT,
            replacements: {
                periodo: periodoActivo
            }
        });
        return captacion;
    } catch (error) {
        throw error;
    }
}