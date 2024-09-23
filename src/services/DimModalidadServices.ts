import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { getModalidadesQuery, queries } from '../database/modalidadQueries';
import { getIdsFechas } from './DimFechaServices';

interface FechaId {
    idFecha: number;
}

export const getIdModalidadData = async (modalidadR: string) => {
    try {
        const IdModalidad = await dataDB.query(queries.getIdModalidadData, {
            type: QueryTypes.SELECT,
            replacements: {
                modalidad: modalidadR
            }
        }) as { id: string }[]; // Tipar el resultado como un array de objetos con el campo 'id'
        return IdModalidad.length > 0 ? IdModalidad[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID del Modalidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getModalidadData = async (idReq: string) => {
    try {
        const Modalidad = await dataDB.query(queries.getModalidadData, {
            type: QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        });
        return Modalidad;
    } catch (error) {
        console.error("Error obteniendo el data.Modalidad:", error);
        throw error;
    }
};

export const getModalidadCore = async (control: string) => {
    try {
        const Modalidad = await coreDB.query(queries.getModalidadCore, {
            type: QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        });
        return Modalidad[0];
    } catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
};

export const setModalidadData = async (modalidad: string) => {
    try {
        const result = await dataDB.query(queries.setModalidadData, {
            type: QueryTypes.INSERT,
            replacements: {
                nombre: modalidad
            }
        });
        return result;
    } catch (error) {
        console.error("Error al INSERTAR el Modalidad:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

interface FechaId {
    idFecha: number;
}

export const getAllModalidades = async (unidad?: string, carreras?: string, inicio?: string, fin?: string) => {
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
        const query = getModalidadesQuery(unidad, carreras, ids);

        const Modalidad = await dataDB.query(query, {
            type: QueryTypes.SELECT,
            replacements
        });
        
        return Modalidad;
    } catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
};

export const getModalidades = async () => {
    try {
        const Modalidad = await dataDB.query(queries.getModalidades, {
            type: QueryTypes.SELECT
        });
        return Modalidad;
    } catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
};

export const getModalidadesUnidad = async (unidad: string) => {
    try {
        const Modalidad = await dataDB.query(queries.getModalidadesUnidad, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return Modalidad;
    } catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
};

export const getModalidadesFecha = async (fechaInicio: string, fechaFin: string) => {
    try {
        const ids = await getIdFechas(fechaInicio, fechaFin);
        if (ids.length === 0) {
            return null;
        }
        const Modalidad = await dataDB.query(queries.getModalidadesFecha, {
            type: QueryTypes.SELECT,
            replacements: {
                ids: ids
            }
        });
        return Modalidad;
    } catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
};

export const getModalidadesUnidadFecha = async (unidad: string, fechaInicio: string, fechaFin: string) => {
    try {
        const ids = await getIdFechas(fechaInicio, fechaFin);
        if (ids.length === 0) {
            return null;
        }
        const Modalidad = await dataDB.query(queries.getModalidadesUnidadFecha, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad,
                ids: ids
            }
        });
        return Modalidad;
    } catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }
};

export const getIdFechas = async (fechaInicio: string, fechaFin: string) => {
    try {
        const idsRes = await getIdsFechas(fechaInicio, fechaFin) as FechaId[];
        const ids = idsRes.map(item => item.idFecha);
        console.log(ids);
        return ids;
    } catch (error) {
        console.error("Error obteniendo el core.Modalidad:", error);
        throw error;
    }

}