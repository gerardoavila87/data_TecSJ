export const queries = {
  getIdProcedenciaData: `
        SELECT idProcedencia AS id
  FROM DimProcedencia
 WHERE LOWER(municipio) = LOWER(:municipio)
   AND LOWER(estado) = LOWER(:estado);
`,
  getProcedenciaData: `
        SELECT municipio, estado
          FROM DimProcedencia
         WHERE idProcedencia = :id;`,
  getProcedenciaCore: `
        SELECT ua.state AS estado, ua.city AS municipio
          FROM Users u
          JOIN UserStudents us ON u.user_IdUser = us.user_IdUser
          JOIN UserAddress ua ON ua.user_IdAddress = u.user_IdAddress 
         WHERE us.code = :ncontrol;`,
  setProcedenciaData: `
        INSERT INTO DimProcedencia (idProcedencia, estado, municipio)
             VALUES (0, :estado, :municipio);`,
  getAllProcedencias: `
       SELECT dp.estado, dp.municipio, COUNT(fm.idMatricula) AS cantidad
         FROM FactMatricula fm 
    LEFT JOIN DimProcedencia dp ON dp.idProcedencia = fm.idProcedencia 
        WHERE ISNULL(fm.idFechaTermino)
     GROUP BY fm.idProcedencia
     ORDER BY dp.estado, dp.municipio;`,
  getProcedencias: `
       SELECT du.nombre AS unidad, dp.estado, dp.municipio, COUNT(fm.idMatricula) AS cantidad
         FROM FactMatricula fm 
    LEFT JOIN DimProcedencia dp ON dp.idProcedencia = fm.idProcedencia 
         JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
        WHERE ISNULL(fm.idFechaTermino)
     GROUP BY fm.idProcedencia, fm.idUnidadReal 
     ORDER BY du.nombre, dp.estado, dp.municipio;`,
  getProcedenciasFecha: `
      `,
  getProcedenciasUnidad: `
       SELECT du.nombre AS unidad, dp.estado, dp.municipio, COUNT(fm.idMatricula) AS cantidad
         FROM FactMatricula fm 
    LEFT JOIN DimProcedencia dp ON dp.idProcedencia = fm.idProcedencia 
         JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
        WHERE ISNULL(fm.idFechaTermino)
          AND du.nombre = :unidad
     GROUP BY fm.idProcedencia, fm.idUnidadReal 
     ORDER BY du.nombre, dp.estado, dp.municipio;`,
  getProcedenciasUnidadFecha: ``
}

export const getProcedenciaQuery = (unidad?: string, carreras?: string, ids?: number[]): string => {
  let query = `SELECT `;

  if (unidad) query += `du.nombre AS unidad,`;

  if (carreras) query += `dc.clave, dc.abreviacion, dc.nombre AS carrera,`;

  query += ` dp.estado, dp.municipio, COUNT(fm.idMatricula) AS cantidad
         FROM FactMatricula fm 
         JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
    LEFT JOIN DimProcedencia dp ON dp.idProcedencia = fm.idProcedencia\n`;

  if (unidad || carreras) query += `JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal\n`;

  if (carreras) query += `JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera\n`;

  if (Array.isArray(ids) && ids.length > 0) {
    query += `WHERE fm.idFechaInicio IN (:ids) 
                AND (fm.idFechaTermino IS NULL OR fm.idFechaTermino > 
                    (SELECT MAX(idFecha) FROM DimFecha WHERE idFecha IN (:ids)))\n`;
  } else {
    query += `WHERE fm.idFechaTermino IS NULL\n`;
  }

  query += `AND df.periodo = :periodo\n`;

  if (carreras) query += `AND du.nombre = :carreras\n`;

  if (unidad) query += `AND du.nombre = :unidad\n`;

  query += `GROUP BY fm.idProcedencia `;
  
  if (carreras) query += `, dc.nombre `;

  query += `\nORDER BY `;

  if (carreras) query += ` dc.nombre,`;

  query += `dp.estado, dp.municipio`;
  
  return query;
}