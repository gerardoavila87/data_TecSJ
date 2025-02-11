import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { getEstudiosQuery, queries } from '../database/estudioQueries';
import { EstudioType } from '../models/estudioModel'
import { getIdsFechas, getPeriodo } from './DimFechaServices';

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

export const getIdEstudioClave = async (clave: string) => {
    try {
        const IdEstudio = await dataDB.query(queries.getIdEstudioClave, {
            type: QueryTypes.SELECT,
            replacements: {
                clave: clave
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

interface FechaId {
    idFecha: number;
}

export const getAllEstudio = async (unidad?: string, carreras?: string, inicio?: string, fin?: string, periodo?: string) => {
    try {
        let ids: number[] = [];
        const replacements: any = {};

        if (inicio && fin) {
            const idsRes = await getIdsFechas(inicio, fin, periodo) as FechaId[];
            ids = idsRes.map(item => item.idFecha);
        }

        const query = getEstudiosQuery(unidad, carreras, ids);
        let periodoActivo;
        !periodo ? periodoActivo = await getPeriodo() : periodoActivo = periodo;
        replacements.periodo = periodoActivo;

        if (carreras) replacements.carreras = carreras;
        if (unidad) replacements.unidad = unidad;
        if (ids.length > 0) replacements.ids = ids;

        const estudios = await dataDB.query(query, {
            type: QueryTypes.SELECT,
            replacements
        });

        return estudios;
    } catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
};

export const getEstudioUR = async () => {
    try {
        const estudios = await dataDB.query(queries.getEstudiosUR, {
            type: QueryTypes.SELECT
        });

        return estudios;

    } catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
};

export const getEstudioUO = async () => {
    try {
        const estudios = await dataDB.query(queries.getEstudiosUO, {
            type: QueryTypes.SELECT
        });

        return estudios;

    } catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
};

export const getEstudioUOC = async (unidad: string) => {
    try {
        const estudios = await dataDB.query(queries.getEstudiosUOC, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });

        return estudios;

    } catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
};

export const getEstudioURC = async (unidad: string) => {
    try {
        const estudios = await dataDB.query(queries.getEstudiosURC, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return estudios;
    } catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
};

export const getEstudioURCarrera = async (unidad: string) => {
    try {
        const estudios = await dataDB.query(queries.getEstudiosURCarrera, {
            type: QueryTypes.SELECT,
            replacements: {
                unidad: unidad
            }
        });
        return estudios;
    } catch (error) {
        console.error("Error obteniendo el core.estudio:", error);
        throw error;
    }
};