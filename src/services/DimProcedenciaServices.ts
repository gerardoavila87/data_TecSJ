import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { getProcedenciaQuery, queries } from '../database/procedenciaQueries';
import { ProcedenciaType } from '../models/procedenciaModel';
import { getIdsFechas } from './DimFechaServices';

export const getIdProcedenciaData = async (procedencia: ProcedenciaType) => {
    try {
        const idProcedencia = await dataDB.query(queries.getIdProcedenciaData, {
            type: QueryTypes.SELECT,
            replacements: {
                municipio: procedencia.municipio,
                estado: procedencia.estado
            }
        }) as { id: string }[];
        return idProcedencia.length > 0 ? idProcedencia[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID la Procedencia:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getProcedenciaData = async (idReq: string): Promise<ProcedenciaType> => {
    try {
        const procedencia = await dataDB.query(queries.getProcedenciaData, {
            type: QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        }) as ProcedenciaType[];
        return procedencia[0];
    } catch (error) {
        console.error("Error obteniendo la data.Procedencia:", error);
        throw error;
    }
};

export const getProcedenciaCore = async (control: string): Promise<ProcedenciaType> => {
    try {
        const procedencia = await coreDB.query(queries.getProcedenciaCore, {
            type: QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        }) as ProcedenciaType[];

        return procedencia[0];
    } catch (error) {
        console.error("Error obteniendo la core.Procedencia:", error);
        throw error;
    }
};

export const setProcedenciaData = async (procedencia: ProcedenciaType) => {
    try {
        const result = await dataDB.query(queries.setProcedenciaData, {
            type: QueryTypes.INSERT,
            replacements: {
                municipio: procedencia.municipio,
                estado: procedencia.estado
            }
        });
        return result;
    } catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
};

interface FechaId {
    idFecha: number;
}

export const getAllProcedencias = async (unidad?: string, carreras?: string, inicio?: string, fin?: string) => {
    try {
        let ids: number[] = [];
        if (inicio && fin) {
            const resIds = await getIdsFechas(inicio, fin) as FechaId[];
            ids = resIds.map(item => item.idFecha)
        }

        const replacements: any = {
            ...(carreras && { carreras }),
            ...(unidad && { unidad }),
            ...(ids.length > 0 && { ids })
        };
        const query = getProcedenciaQuery(unidad, carreras, ids);
        const result = await dataDB.query(query, {
            type: QueryTypes.SELECT,
            replacements
        });
        return result;
    } catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
}

export const getProcedencias = async () => {
    try {
        const result = await dataDB.query(queries.getProcedencias, {
            type: QueryTypes.SELECT
        });
        return result;
    } catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
}

export const getProcedenciasFecha = async (fechaInicio: string, fechaFin: string) => {
    try {
        const result = await dataDB.query(queries.getProcedenciasFecha, {
            type: QueryTypes.SELECT
        });
        return result;
    } catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
}

export const getProcedenciasUnidad = async (unidad: string) => {
    try {
        const result = await dataDB.query(queries.getProcedenciasUnidad, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return result;
    } catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
}

export const getProcedenciasUnidadFecha = async (unidad: string, fechaInicio: string, fechaFin: string) => {
    try {
        const result = await dataDB.query(queries.getProcedenciasUnidadFecha, {
            type: QueryTypes.SELECT
        });
        return result;
    } catch (error) {
        console.error("Error al consultar la Procedencia:", error);
        throw error;
    }
}