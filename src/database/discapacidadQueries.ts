export const queries = {
  getIdDiscapacidadData: `
    SELECT IdDiscapacidad as id
      FROM DimDiscapacidades
     WHERE nombre = :discapacidad;`,
  getDiscapacidadData: `
    SELECT nombre 
      FROM DimDiscapacidades
     WHERE IdDiscapacidad = :id;`,
  getDiscapacidadCore: `
       SELECT uc.dp1 AS discapacidad
         FROM UserStudents us
    LEFT JOIN UserCapacity uc ON uc.user_IdUser = us.user_IdUser
        WHERE us.code = :control;`,
  setDiscapacidadData: `
    INSERT INTO DimDiscapacidades (IdDiscapacidad, nombre)
         VALUES (NULL, :discapacidad);`,
  getAllDiscapacidades: `  
       SELECT dd.nombre, COUNT(fm.idMatricula) as cantidad
         FROM FactMatricula fm 
         JOIN DimFecha df ON df.idFecha = fm.idFechaInicio 
    LEFT JOIN DimDiscapacidades dd ON dd.IdDiscapacidad  = fm.idDiscapacidad
        WHERE ISNULL(fm.idFechaTermino)
        AND df.periodo = :periodo
     GROUP BY fm.idDiscapacidad`,
  getDiscapacidadesUR: `
      SELECT du.nombre as unidad, dd.nombre as discapacidad, COUNT(fm.idMatricula) as cantidad 
        FROM FactMatricula fm 
        JOIN DimDiscapacidades dd ON dd.IdDiscapacidad  = fm.idDiscapacidad
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
       WHERE ISNULL(fm.idFechaTermino)
    GROUP BY fm.idDiscapacidad, fm.idUnidadReal
    ORDER BY du.nombre, dd.nombre`,
  getDiscapacidadesUO: `      
      SELECT du.nombre as unidad, dd.nombre as discapacidad, COUNT(fm.idMatricula) as cantidad 
        FROM FactMatricula fm 
        JOIN DimDiscapacidades dd ON dd.IdDiscapacidad  = fm.idDiscapacidad
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial 
       WHERE ISNULL(fm.idFechaTermino)
    GROUP BY fm.idDiscapacidad, fm.idUnidadOficial
    ORDER BY du.nombre, dd.nombre`,
  getDiscapacidadesURC: `
       SELECT du.nombre as unidad, dd.nombre as discapacidad, COUNT(fm.idMatricula) as cantidad 
         FROM FactMatricula fm 
    LEFT JOIN DimDiscapacidades dd ON dd.IdDiscapacidad  = fm.idDiscapacidad
         JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
         JOIN DimFecha df ON df.idFecha = fm.idFechaInicio 
        WHERE ISNULL(fm.idFechaTermino)
          AND du.nombre = :unidad
          AND df.periodo = :periodo
    GROUP BY fm.idDiscapacidad, fm.idUnidadReal
    ORDER BY du.nombre, dd.nombre`,
  getDiscapacidadesUOC: `
      SELECT du.nombre as unidad, dd.nombre as discapacidad, COUNT(fm.idMatricula) as cantidad 
        FROM FactMatricula fm 
        JOIN DimDiscapacidades dd ON dd.IdDiscapacidad  = fm.idDiscapacidad
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial 
       WHERE ISNULL(fm.idFechaTermino)
         AND du.nombre = :unidad
    GROUP BY fm.idDiscapacidad, fm.idUnidadOficial
    ORDER BY du.nombre, dd.nombre`,
  getDiscapacidadesURFecha: `
       SELECT dd.nombre as discapacidad, COUNT(fm.idMatricula) as cantidad 
         FROM FactMatricula fm 
    LEFT JOIN DimDiscapacidades dd ON dd.IdDiscapacidad  = fm.idDiscapacidad
         JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
        WHERE fm.idFechaInicio IN (:ids)
          AND (fm.idFechaTermino IS NULL 
               OR fm.idFechaTermino > 
               (SELECT MAX(idFecha)
                  FROM DimFecha 
                 WHERE idFecha IN (:ids)))
          AND df.periodo = :periodo
     GROUP BY fm.idDiscapacidad
     ORDER BY dd.nombre`,
  getDiscapacidadesURCFecha: `
      SELECT du.nombre as unidad, dd.nombre as discapacidad, COUNT(fm.idMatricula) as cantidad 
        FROM FactMatricula fm 
        JOIN DimDiscapacidades dd ON dd.IdDiscapacidad  = fm.idDiscapacidad
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal  
       WHERE fm.idFechaInicio IN (:ids)
         AND (fm.idFechaTermino IS NULL 
              OR fm.idFechaTermino > 
              (SELECT MAX(idFecha)
                 FROM DimFecha 
                WHERE idFecha IN (:ids)))
         AND du.nombre = :unidad
    GROUP BY fm.idDiscapacidad, fm.idUnidadReal
    ORDER BY du.nombre, dd.nombre`
}

export const getDiscapacidadCarreraQuery = (unidad?: string, ids?: number[]): string => {
  let query = `SELECT dc.nombre as carrera, dd.nombre as discapacidad, COUNT(fm.idMatricula) as cantidad 
                 FROM FactMatricula fm 
                 JOIN DimDiscapacidades dd ON dd.IdDiscapacidad  = fm.idDiscapacidad
                 JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal  
                 JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera
                 JOIN DimFecha df ON df.idFecha = fm.idFechaInicio\n`;

  if (Array.isArray(ids) && ids.length > 0) {
    query += `WHERE fm.idFechaInicio IN (:ids)
                AND (fm.idFechaTermino IS NULL 
                     OR fm.idFechaTermino > 
                     (SELECT MAX(idFecha)
                        FROM DimFecha 
                       WHERE idFecha IN (:ids)))\n`;
  } else query += `WHERE fm.idFechaTermino IS NULL\n`;
  query += `AND df.periodo = :periodo\n`;
  if (unidad) query += `AND du.nombre = :unidad\n`;

  query += ` GROUP BY fm.idDiscapacidad, fm.idUnidadReal, fm.idCarrera 
             ORDER BY dc.nombre, dd.nombre`;
  return query;
}