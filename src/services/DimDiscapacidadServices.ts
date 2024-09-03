import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/discapacidadQueries';

export const getIdDiscapacidadData = async (discapacidadR: string) => {
    try {
        const IdDiscapacidad = await dataDB.query(queries.getIdDiscapacidadData, {
            type: QueryTypes.SELECT,
            replacements: {
                discapacidad: discapacidadR
            }
        }) as { id: string }[];
        return IdDiscapacidad.length > 0 ? IdDiscapacidad[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID de la discapacidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getDiscapacidadData = async (idReq: string) => {
    try {
        const discapacidad = await dataDB.query(queries.getDiscapacidadData, {
            type: QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        }) as { discapacidad: string }[];

        return discapacidad;
    } catch (error) {
        console.error("Error obteniendo la data.discapacidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getDiscapacidadCore = async (controlReq: string) => {
    try {
        const discapacidad = await coreDB.query(queries.getDiscapacidadCore, {
            type: QueryTypes.SELECT,
            replacements: {
                control: controlReq
            }
        }) as { discapacidad: string }[]; // Tipar el resultado como un array de objetos con el campo 'id'

        return discapacidad;
    } catch (error) {
        console.error("Error obteniendo la core.discapacidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
}

export const setDiscapacidadData = async (discapacidadR: string) => {
    try {
        const result = await dataDB.query(queries.setDiscapacidadData, {
            type: QueryTypes.INSERT,
            replacements: {
                clave: discapacidadR,
            }
        })
        return result;
    } catch (error) {
        console.error("Error al INSERTAR la discapacidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
}

export const getDiscapacidadC = async (unidad: string, carrera: string) => {
    try {
        const result = await dataDB.query(queries.getDiscapacidadesC, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getDiscapacidadU = async (unidad: string) => {
    try {
        const result = await dataDB.query(queries.getDiscapacidadesU, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getAllDiscapacidad = async () => {
    try {
        const result = await dataDB.query(queries.getAllDiscapacidades, {
            type: QueryTypes.SELECT
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};
