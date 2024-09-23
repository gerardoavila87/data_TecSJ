"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEstudiosQuery = exports.queries = void 0;
exports.queries = {
    getIdEstudioData: `
        SELECT idEstudio AS id
FROM DimEstudios
WHERE nombre LIKE :escuela;`,
    getEstudioData: `
        SELECT *
FROM DimEstudios
WHERE idEstudio = :id;`,
    getEstudioCore: `
        SELECT us2.name AS estudios
          FROM Users u
          JOIN UserStudents us ON u.user_IdUser = us.user_IdUser
          JOIN UserStudies us2 ON us2.user_IdStudy = u.user_IdStudy 
         WHERE us.code = :ncontrol;`,
    setEstudioData: `
        INSERT INTO DimEstudios (idEstudio, clave, nombre, estado, municipio, nivel, tipo)
             VALUES (0, :clave, :nombre, :estado, :municipio, :nivel, :tipo);`,
    getAllEstudios: `
      SELECT de.nombre, COUNT(fm.idMatricula) as cantidad
        FROM FactMatricula fm 
        JOIN DimEstudios de ON de.idEstudio  = fm.idEstudio 
       WHERE ISNULL(fm.idFechaTermino)
    GROUP BY fm.idEstudio;`,
    getEstudiosUR: `
      SELECT du.nombre as unidad, de.nombre, COUNT(fm.idMatricula) as cantidad
        FROM FactMatricula fm 
        LEFT JOIN DimEstudios de ON de.idEstudio  = fm.idEstudio 
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
       WHERE ISNULL(fm.idFechaTermino)
    GROUP BY fm.idEstudio 
    ORDER BY du.nombre, de.nombre`,
    getEstudiosUO: `
      SELECT du.nombre as unidad, de.nombre, COUNT(fm.idMatricula) as cantidad
        FROM FactMatricula fm 
        LEFT JOIN DimEstudios de ON de.idEstudio  = fm.idEstudio 
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial 
       WHERE ISNULL(fm.idFechaTermino)
    GROUP BY fm.idEstudio 
    ORDER BY du.nombre, de.nombre`,
    getEstudiosURC: `
      SELECT du.nombre as unidad, de.nombre, COUNT(fm.idMatricula) as cantidad
        FROM FactMatricula fm 
        LEFT JOIN DimEstudios de ON de.idEstudio  = fm.idEstudio 
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
       WHERE ISNULL(fm.idFechaTermino)
         AND du.nombre =:unidad
    GROUP BY fm.idEstudio 
    ORDER BY du.nombre, de.nombre`,
    getEstudiosUOC: `
      SELECT du.nombre as unidad, de.nombre, COUNT(fm.idMatricula) as cantidad
        FROM FactMatricula fm 
        LEFT JOIN DimEstudios de ON de.idEstudio  = fm.idEstudio 
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial
       WHERE ISNULL(fm.idFechaTermino)
         AND du.nombre = :unidad
    GROUP BY fm.idEstudio 
    ORDER BY du.nombre, de.nombre`,
    getEstudiosURCarrera: `
      SELECT du.nombre AS unidad, dc.nombre AS carrera, de.nombre AS estudios, COUNT(fm.idMatricula) as cantidad
        FROM FactMatricula fm 
        LEFT JOIN DimEstudios de ON de.idEstudio  = fm.idEstudio 
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
        JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
       WHERE ISNULL(fm.idFechaTermino)
         AND du.nombre =:unidad
    GROUP BY fm.idEstudio, fm.idCarrera 
    ORDER BY dc.nombre, de.nombre`
};
const getEstudiosQuery = (unidad, carreras, ids) => {
    let query = `SELECT `;
    if (unidad)
        query += `du.nombre AS unidad,`;
    if (carreras)
        query += `dc.clave, dc.abreviacion, dc.nombre AS carrera,`;
    query += ` de.nombre AS escuela, COUNT(fm.idMatricula) as cantidad
       FROM FactMatricula fm 
       JOIN DimEstudios de ON de.idEstudio = fm.idEstudio\n`;
    if (unidad || carreras)
        query += `JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal\n`;
    if (carreras)
        query += `JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera\n`;
    if (Array.isArray(ids) && ids.length > 0) {
        query += `WHERE fm.idFechaInicio IN (:ids) 
                AND (fm.idFechaTermino IS NULL OR fm.idFechaTermino > 
                    (SELECT MAX(idFecha) FROM DimFecha WHERE idFecha IN (:ids)))\n`;
    }
    else {
        query += `WHERE fm.idFechaTermino IS NULL\n`;
    }
    if (carreras)
        query += `AND du.nombre = :carreras\n`;
    if (unidad)
        query += `AND du.nombre = :unidad\n`;
    query += `GROUP BY fm.idEstudio `;
    if (carreras)
        query += `, dc.nombre \n`;
    query += `ORDER BY `;
    if (carreras)
        query += `dc.nombre, `;
    query += ` de.nombre`;
    return query;
};
exports.getEstudiosQuery = getEstudiosQuery;
