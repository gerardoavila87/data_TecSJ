import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { getDiscapacidadCarreraQuery, queries } from '../database/discapacidadQueries';
import { getIdsFechas, getPeriodo } from './DimFechaServices';

interface FechaId {
    idFecha: number;
}

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

export const getDiscapacidadUOC = async (unidad: string) => {
    try {
        const result = await dataDB.query(queries.getDiscapacidadesUOC, {
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

export const getDiscapacidadURC = async (unidad: string, periodo?: string) => {
    try {
        const replacements: any = {};
        let periodoActivo;
        !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;
        replacements.periodo = periodoActivo;
        replacements.unidad = unidad;
        const result = await dataDB.query(queries.getDiscapacidadesURC, {
            type: QueryTypes.SELECT,
            replacements
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getDiscapacidadUR = async () => {
    try {
        const result = await dataDB.query(queries.getDiscapacidadesUR, {
            type: QueryTypes.SELECT
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo las discapacidades", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getDiscapacidadUO = async () => {
    try {
        const result = await dataDB.query(queries.getDiscapacidadesUO, {
            type: QueryTypes.SELECT
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo las discapacidades", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getAllDiscapacidad = async (periodo?: string) => {
    try {
        let replacements: any = {};
        let periodoActivo;
        !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;
        replacements.periodo = periodoActivo;
        const query = queries.getAllDiscapacidades;
        console.log(query);
        const result = await dataDB.query(query, {
            type: QueryTypes.SELECT,
            replacements
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo las discapacidades:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getDiscapacidadURFecha = async (fechaInicio: string, fechaFin: string, periodo?: string) => {
    try {
        const idsRes = await getIdsFechas(fechaInicio, fechaFin) as FechaId[];
        const ids = idsRes.map(item => item.idFecha);
        let replacements: any = {};
        let periodoActivo;
        !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;
        replacements.periodo = periodoActivo;
        replacements.ids = ids;
        const result = await dataDB.query(queries.getDiscapacidadesURFecha, {
            type: QueryTypes.SELECT,
            replacements
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo las discapacidades", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getDiscapacidadURCFecha = async (unidad: string, fechaInicio: string, fechaFin: string, periodo?:string) => {
    try {
        const idsRes = await getIdsFechas(fechaInicio, fechaFin) as FechaId[];
        const ids = idsRes.map(item => item.idFecha);
        let replacements: any = {};
        let periodoActivo;
        !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;
        replacements.periodo = periodoActivo;
        replacements.unidad = unidad;
        replacements.ids = ids;
        const result = await dataDB.query(queries.getDiscapacidadesURFecha, {
            type: QueryTypes.SELECT,
            replacements
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getDiscapacidadCarrera = async (unidad?: string, fechaInicio?: string, fechaFin?: string, periodo?: string) => {
    try {
        let ids: number[] = [];
        let replacements: any = {};

        if (fechaInicio && fechaFin) {
            const idsRes = await getIdsFechas(fechaInicio, fechaFin) as FechaId[];
            ids = idsRes.map(item => item.idFecha);
        }

        let query = getDiscapacidadCarreraQuery(unidad, ids);
        let periodoActivo;
        !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;
        replacements.periodo = periodoActivo;
        if (ids.length > 0) replacements.ids = ids;
        if (unidad) replacements.unidad = unidad;
        const result = await dataDB.query(query, {
            type: QueryTypes.SELECT,
            replacements
        });

        return result;
    } catch (error) {
        console.error("Error obteniendo la discapacidad por carrera:", error);
        throw error;
    }
};