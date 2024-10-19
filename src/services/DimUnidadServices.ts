import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/unidadQueries';
import { UnidadType } from '../models/unidadModel';

export const getIdUnidadData = async (unidad: string) => {
    try {
        const idUnidad = await dataDB.query(queries.getIdUnidadData, {
            type: QueryTypes.SELECT,
            replacements: {
                nombre: unidad
            }
        }) as { id: string }[];
        return idUnidad.length > 0 ? idUnidad[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID la Unidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getIdUnidadClave = async (clave: string) => {
    try {
        const idUnidad = await dataDB.query(queries.getIdUnidadClave, {
            type: QueryTypes.SELECT,
            replacements: {
                clave: clave
            }
        }) as { id: string }[];
        return idUnidad.length > 0 ? idUnidad[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID la Unidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getUnidadData = async (idReq: string): Promise<UnidadType> => {
    try {
        const unidad = await dataDB.query(queries.getUnidadData, {
            type: QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        }) as UnidadType[];
        return unidad[0];
    } catch (error) {
        console.error("Error obteniendo la data.Unidad:", error);
        throw error;
    }
};

export const getUnidadReal = async (control: string) => {
    try {
        const unidad = await coreDB.query(queries.getUnidadReal, {
            type: QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        });

        return unidad[0];
    } catch (error) {
        console.error("Error obteniendo la core.Unidad:", error);
        throw error;
    }
};

export const getUnidadOficial = async (control: string) => {
    try {
        const unidad = await coreDB.query(queries.getUnidadOficial, {
            type: QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        });

        return unidad[0];
    } catch (error) {
        console.error("Error obteniendo la core.Unidad:", error);
        throw error;
    }
};

export const setUnidadData = async (unidad: UnidadType) => {
    try {
        const result = await dataDB.query(queries.setUnidadData, {
            type: QueryTypes.INSERT,
            replacements: {
                clave: unidad.clave,
                nombre: unidad.nombre
            }
        });
        return result;
    } catch (error) {
        console.error("Error al INSERTAR la Unidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getAllUnidadReal = async()=>{
    try{
        const result = await dataDB.query(queries.getAllUnidadReal, {
            type: QueryTypes.SELECT
        });
        return result;
    } catch (error) {
        console.error("Error OBTENIENDO las Unidades:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};
export const getAllUnidadOficial = async()=>{
    try{
        const result = await dataDB.query(queries.getAllUnidadOficial, {
            type: QueryTypes.SELECT
        });
        return result;
    } catch (error) {
        console.error("Error OBTENIENDO las Unidades:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};