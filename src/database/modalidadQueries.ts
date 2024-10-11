export const queries = {
  getIdModalidadData: `
    SELECT idModalidad AS id
      FROM DimModalidades
      WHERE nombre = :modalidad;`,
  getModalidadData: `
    SELECT nombre
      FROM DimModalidades
      WHERE idModalidad = :id;`,
  getModalidadCore: `
    SELECT im.name AS nombre
      FROM UserStudents us
      JOIN InsModes im ON im.ins_IdMode = us.plan_IdMode
     WHERE us.code = :ncontrol;`,
  setModalidadData: `
    INSERT INTO DimModalidades (idModalidad, nombre)
          VALUES (0, :nombre);`,
  getAllModalidades: `
      SELECT dm.nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm 
        JOIN DimModalidades dm ON dm.idModalidad = fm.idModalidad
        WHERE fm.idFechaTermino IS NULL
    GROUP BY fm.idModalidad;`,
  getModalidades: `
      SELECT du.nombre AS unidad,dm.nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm 
        JOIN DimModalidades dm ON dm.idModalidad = fm.idModalidad
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
    GROUP BY fm.idModalidad, fm.idUnidadReal
    ORDER BY du.nombre, dm.nombre;`,
  getModalidadesUnidad: `
      SELECT dm.nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm 
        JOIN DimModalidades dm ON dm.idModalidad = fm.idModalidad
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
       WHERE du.nombre = :unidad
    GROUP BY fm.idModalidad, fm.idUnidadReal
    ORDER BY du.nombre, dm.nombre; `,
  getModalidadesFecha: `
      SELECT du.nombre AS unidad,dm.nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm 
        JOIN DimModalidades dm ON dm.idModalidad = fm.idModalidad
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
       WHERE fm.idFechaInicio IN (:ids)
         AND (fm.idFechaTermino IS NULL 
              OR fm.idFechaTermino > 
              (SELECT MAX(idFecha)
                 FROM DimFecha 
                WHERE idFecha IN (:ids)))
    GROUP BY fm.idModalidad, fm.idUnidadReal
    ORDER BY du.nombre, dm.nombre;`,
  getModalidadesUnidadFecha: `
      SELECT dm.nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm 
        JOIN DimModalidades dm ON dm.idModalidad = fm.idModalidad
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
        WHERE fm.idFechaInicio IN (:ids)
          AND (fm.idFechaTermino IS NULL 
              OR fm.idFechaTermino > 
              (SELECT MAX(idFecha)
                  FROM DimFecha 
                WHERE idFecha IN (:ids)))
          AND du.nombre = :unidad
    GROUP BY fm.idModalidad, fm.idUnidadReal
    ORDER BY du.nombre, dm.nombre; `
}

export const getModalidadesQuery = (unidad?: string, carreras?: string, ids?: number[]): string => {
  let query = `SELECT `;

  if (unidad) query += `du.nombre AS unidad,`;

  if (carreras) query += `dc.clave, dc.abreviacion, dc.nombre AS carrera,`;

  query += ` dm.nombre AS modalidad, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm 
        JOIN DimModalidades dm ON dm.idModalidad = fm.idModalidad
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio\n`;

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

  query += `GROUP BY fm.idModalidad `;

  if (carreras) query += `, dc.nombre `;

  query += `\nORDER BY `;

  if (carreras) query += ` dc.nombre,`;

  query += ` dm.nombre`;

  return query;
}