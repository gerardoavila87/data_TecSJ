import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/procedenciaQueries';
import { ProcedenciaType } from '../models/procedenciaModel';

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
        console.error("Error al INSERTAR la Procedencia:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};