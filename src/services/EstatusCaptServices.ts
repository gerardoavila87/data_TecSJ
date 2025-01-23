import { dataDB } from "../database/connection"
import { queries } from "../database/estatusQueries";
import { QueryTypes } from 'sequelize';

export const getIdEstatus = async (estatus: string) => {
    try {
        const IdEstatus = await dataDB.query(queries.getIdEstatus, {
            type: QueryTypes.SELECT,
            replacements: {
                estatus: estatus
            }
        }) as { id: number }[];
        return IdEstatus.length > 0 ? IdEstatus[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID del estatus:", error);
        throw error; 
    }
};
