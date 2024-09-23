import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/carreraQueries';
import { CarreraType } from '../models/carreraModel';
import { getIdsFechas } from './DimFechaServices';

export const getIdCarreraData = async (claveReq: string) => {
    try {
        const idCarrera = await dataDB.query(queries.getIdCarreraData, {
            type: QueryTypes.SELECT,
            replacements: {
                clave: claveReq
            }
        }) as { id: string }[];
        return idCarrera.length > 0 ? idCarrera[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getClaveCarreraData = async (idReq: string): Promise<CarreraType> => {
    try {
        const claveCarrera = await dataDB.query(queries.getClaveCarreraData, {
            type: QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        }) as CarreraType[];

        return claveCarrera[0];
    } catch (error) {
        console.error("Error obteniendo la data.CLAVE de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getClaveCarreraCore = async (controlReq: string) => {
    try {
        const claveCarrera = await coreDB.query(queries.getClaveCarreraCore, {
            type: QueryTypes.SELECT,
            replacements: {
                control: controlReq
            }
        }) as { clave: string }[];

        return claveCarrera;
    } catch (error) {
        console.error("Error obteniendo la core.CLAVE de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
}

export const setCarreraData = async (carrera: CarreraType) => {
    try {
        const result = await dataDB.query(queries.setCarreraData, {
            type: QueryTypes.INSERT,
            replacements: {
                clave: carrera.clave,
                abreviacion: carrera.abreviacion,
                nombre: carrera.nombre
            }
        })

        return result;
    } catch (error) {
        console.error("Error al INSERTAR la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
}

export const getAllCarrerasUO = async (unidad: string) => {
    try {
        const result = await dataDB.query(queries.getAllCarrerasO, {
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

export const getCarreraUO = async (unidad: string) => {
    try {
        const result = await dataDB.query(queries.getCarreraUnidadO, {
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

export const getAllCarrerasUR = async (unidad: string) => {
    try {
        const result = await dataDB.query(queries.getAllCarrerasR, {
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

export const getAllCarrerasUReal = async () => {
    try {
        const result = await dataDB.query(queries.getAllCarrerasReal, {
            type: QueryTypes.SELECT,
        });
        return result;
    } catch (error) {
        console.error("Error obteniendo el ID de la carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

interface FechaId {
    idFecha: number;
};

export const getCarreraUR = async (unidad: string, fechaInicio?: string, fechaFin?: string) => {
    try {
        if (fechaInicio && fechaFin) {
            const idsRes = await getIdsFechas(fechaInicio, fechaFin) as FechaId[];
            const ids = idsRes.map(item => item.idFecha);
            console.log(ids);
            const result = await dataDB.query(queries.getCarreraUnidadRFecha, {
                type: QueryTypes.SELECT,
                replacements: {
                    unidad: unidad,
                    ids: ids
                }
            });
            return result;
        } else {
            const result = await dataDB.query(queries.getCarreraUnidadR, {
                type: QueryTypes.SELECT,
                replacements: {
                    unidad: unidad
                }
            });
            return result;
        }        
    } catch (error) {
        console.error("Error obteniendo los estudiantes por carrera:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};