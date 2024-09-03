import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/modalidadQueries';

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