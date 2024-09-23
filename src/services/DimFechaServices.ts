import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/fechaQueries';
import { FechaType } from '../models/fechaModel';

export const getFechaAct = async () => {
    try {
        await dataDB.query(queries.setEspanol);
        let idFecha: { id: string }[] = await dataDB.query(queries.getFechaAct, {
            type: QueryTypes.SELECT,
        });
        if (idFecha.length === 0) {
            const periodoR = await coreDB.query(queries.getPeriodo, {
                type: QueryTypes.SELECT,
            }) as { periodo: string }[];
            if (periodoR.length > 0) {
                await dataDB.query(queries.setFechaAct, {
                    type: QueryTypes.INSERT,
                    replacements: { period: periodoR[0].periodo }
                });
                idFecha = await dataDB.query(queries.getFechaAct, {
                    type: QueryTypes.SELECT,
                }) as { id: string }[];
            } else {
                throw new Error("No se encontró ningún periodo en la base de datos core");
            }
        }
        return idFecha.length > 0 ? idFecha[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID de la fecha:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getFechaData = async (idReq: string): Promise<FechaType[]> => {
    try {
        const fecha = await dataDB.query(queries.getFecha, {
            type: QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        }) as FechaType[];

        return fecha;
    } catch (error) {
        console.error("Error obteniendo los datos de la fecha:", error);
        throw error;
    }
};

export const getIdsFechas = async (fechaInicio: string, fechaFin: string) => {
    try {
        const Ids = await dataDB.query(queries.getIdsFechas, {
            type: QueryTypes.SELECT,
            replacements: {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            }
        });
        return Ids;
    } catch (error) {
        console.error("Error obteniendo los Ids de las Fechas:", error);
        throw error;
    }
}

export const getAllFechas = async (periodo: string) => {
    try {
        const fechas = await dataDB.query(queries.getAllFechas, {
            type: QueryTypes.SELECT,
            replacements: {
                periodo: periodo
            }
        });
        return fechas;
    } catch (error) {
        console.error("Error obteniendo las Fechas:", error);
        throw error;
    }
}

export const getPeriodo = async () => {
    try {
        const periodo = await coreDB.query(queries.getPeriodo, {
            type: QueryTypes.SELECT
        }) as { periodo: string }[];
        return periodo[0].periodo;
    } catch (error) {
        console.error("Error obteniendo el periodo:", error);
        throw error;
    }
}