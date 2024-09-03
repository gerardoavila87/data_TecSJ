import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/estudioQueries';
import { EstudioType } from '../models/estudioModel'

export const getIdEstudioData = async (escuelaR: string) => {
    try {
        const IdEstudio = await dataDB.query(queries.getIdEstudioData, {
            type: QueryTypes.SELECT,
            replacements: {
                escuela: escuelaR
            }
        }) as { id: string }[]; // Tipar el resultado como un array de objetos con el campo 'id'

        return IdEstudio.length > 0 ? IdEstudio[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID del estudio:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getEstudioData = async (idReq: string) => {
    try {
        const estudio = await dataDB.query(queries.getEstudioData, {
            type: QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        })
        return estudio;
    } catch (error) {
        console.error("Error obteniendo el data.estudio:", error);
        throw error;
    }
};

export const getEstudioCore = async (control: string): Promise<EstudioType> => {
    try {
        const estudio = await coreDB.query(queries.getEstudioCore, {
            type: QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        }) as EstudioType[];

        return estudio[0];

    } catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
};

export const setEstudioData = async (estudio: EstudioType) => {
    try {
        const result = await dataDB.query(queries.setEstudioData, {
            type: QueryTypes.INSERT,
            replacements: {
                clave: estudio.clave,
                nombre: estudio.nombre,
                estado: estudio.estado,
                municipio: estudio.municipio,
                nivel: estudio.nivel,
                tipo: estudio.tipo
            }
        })
        return result;
    } catch (error) {
        console.error("Error al INSERTAR el estudio:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
}