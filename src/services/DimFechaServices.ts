import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/fechaQueries';
import { FechaType } from '../models/fechaModel';

export const getFechaAct = async () => {
    try {
        const [periodoR] = await Promise.all([
            coreDB.query(queries.getPeriodo, { type: QueryTypes.SELECT }) as Promise<{ periodo: string }[]>,
        ]);
        if (!periodoR || periodoR.length === 0 || !periodoR[0].periodo) {
            throw new Error("No se encontró ningún periodo en la base de datos core");
        }
        const periodo = periodoR[0].periodo;
        const transaction = await dataDB.transaction();
        try {
            const idFecha = await dataDB.query(queries.getFechaAct, {
                type: QueryTypes.SELECT,
                transaction
            }) as { id: string }[];

            if (idFecha.length > 0) {
                await transaction.commit();
                return idFecha[0].id;
            }
            const result = await dataDB.query(queries.setFechaAct, {
                type: QueryTypes.INSERT,
                replacements: { period: periodo },
                transaction,
            });
            const newIdFecha = await dataDB.query(queries.getFechaAct, {
                type: QueryTypes.SELECT,
                transaction,
            }) as { id: string }[];
            await transaction.commit();
            return newIdFecha[0].id;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.error("Error en getFechaAct:", error);
        throw error;
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

export const getDate = async () => {
    try {
        const date = await dataDB.query(queries.getDate, {
            type: QueryTypes.SELECT
        }) as any[];
        return date[0] || [];
    } catch (error) {
        console.error("Error obteniendo el periodo:", error);
        throw error;
    }
}

export const getLast = async () => {
    try {
        const date = await dataDB.query(queries.getLast, {
            type: QueryTypes.SELECT
        }) as any[];
        return date[0] || [];
    } catch (error) {
        console.error("Error obteniendo el periodo:", error);
        throw error;
    }
}