import { dataDB } from "../database/connection"
import { queries } from "../database/aspiranteQueries";
import { QueryTypes } from 'sequelize';
import { AspiranteType } from "../models/aspiranteModel";

export const getIdAspiranteData = async (curp: string) => {
    try {
        const IdAspirante = await dataDB.query(queries.getIdAspiranteData, {
            type: QueryTypes.SELECT,
            replacements: {
                curp: curp
            }
        }) as { id: string }[];
        return IdAspirante.length > 0 ? IdAspirante[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID del estudiante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const setAspiranteData = async (aspirante: AspiranteType) => {
    try {
        const replacements = { ...aspirante };

        await dataDB.query(queries.setAspiranteData, {
            type: QueryTypes.INSERT,
            replacements
        });
        const idAspirante = getIdAspiranteData(aspirante.curp);
        return idAspirante;
    } catch (error) {
        console.error("Error al INSERTAR el aspirante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
}