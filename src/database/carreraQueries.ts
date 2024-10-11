export const queries = {
  getIdCarreraData: `
        SELECT idCarrera AS id
          FROM DimCarreras dc
         WHERE clave = :clave;`,
  getClaveCarreraData: `
        SELECT clave 
        FROM DimCarreras dc
        WHERE idCarrera = :id;`,
  getClaveCarreraCore: `
        SELECT p.code AS clave
          FROM UserStudents us
          JOIN Programs p ON p.prog_IdProgram = us.prog_IdProgram
         WHERE us.code = :control;`,
  setCarreraData: `
        INSERT INTO DimCarreras (idCarrera, clave, abreviacion, nombre)
             VALUES (0, :clave, :abreviacion, :nombre);`,
  getAllCarrerasO: `
          SELECT dc.nombre 
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE ISNULL(fm.idFechaTermino)
           AND du.nombre = :unidad
        GROUP BY fm.idCarrera
             `,
  getCarreraUnidadO: `
          SELECT dc.clave, dc.abreviacion, dc.nombre, COUNT(fm.idMatricula) AS cantidad
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE ISNULL(fm.idFechaTermino)
             AND du.nombre = :unidad
        GROUP BY fm.idCarrera
             `,
  getAllCarrerasR: `
          SELECT dc.nombre 
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE du.nombre = :unidad
        GROUP BY fm.idCarrera
             `,
  getAllCarrerasReal: `
          SELECT dc.clave, dc.abreviacion, dc.nombre
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
            GROUP BY fm.idCarrera
             `,
  getCarreraUnidadR: `
          SELECT dc.clave, dc.abreviacion, dc.nombre, COUNT(fm.idMatricula) AS cantidad
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE ISNULL(fm.idFechaTermino)
             AND du.nombre = :unidad
        GROUP BY fm.idCarrera`,
  getCarreraUnidadRFecha: `
      SELECT dc.clave, dc.abreviacion, dc.nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm 
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
        JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
       WHERE fm.idFechaInicio IN (:ids)
         AND (fm.idFechaTermino IS NULL OR fm.idFechaTermino > 
              (SELECT MAX(idFecha)
                 FROM DimFecha 
                WHERE idFecha IN (:ids)))
         AND du.nombre = :unidad
    GROUP BY fm.idCarrera
    ORDER BY dc.nombre`
}

export const getCarrerasQuery = (ids?: number[], unidad?: string): string => {
/*
SELECT dc.clave, dc.abreviacion, dc.nombre, COUNT(fm.idMatricula) AS cantidad
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE ISNULL(fm.idFechaTermino)
             AND du.nombre = :unidad
        GROUP BY fm.idCarrera
 */

  let query = `SELECT dc.clave, dc.abreviacion, dc.nombre, COUNT(fm.idMatricula) AS estudiantes
                 FROM FactMatricula fm
                 JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
                 JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera\n`;

  if (unidad) {
    query += `JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal\n`;
  }

  if (Array.isArray(ids) && ids.length > 0) {
    query += `WHERE fm.idFechaInicio IN (:ids)
                AND (fm.idFechaTermino IS NULL 
                    OR fm.idFechaTermino > 
                    (SELECT MAX(idFecha)
                       FROM DimFecha 
                      WHERE idFecha IN (:ids)))\n`;
  } else {
    query += `WHERE fm.idFechaTermino IS NULL\n`;
  }
  query += `AND df.periodo = :periodo\n`

  if (unidad) {
    query += `AND du.nombre = :unidad\n`;
  }
  query += `GROUP BY dc.idCarrera`
  return query;
}