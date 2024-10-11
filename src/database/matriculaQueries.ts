export const queries = {
  getMatriculaCore: `
       SELECT us.code AS nocontrol, u.curp AS curp, u.state AS lugarNacimiento,
              u.name AS nombre, u.firstName AS primerApellido, u.secondName AS segundoApellido,
              um.code AS seguro, u.gender AS genero, u.cellPhone AS celular, u.email AS correo,
              IF(uc.p10 = 'SI', 'S', 'N') AS indigena, p.code AS carrera, im.name AS modalidad,
              us2.name AS estudios, ua.state AS entidad, ua.city AS municipio, 
              ol.name AS nombreUReal, oc.name AS nombreUOficial, 
              uc.dp1 AS discapacidad, us.sem AS semestre, us.opc AS status
         FROM Users u
         JOIN UserStudents us ON u.user_IdUser = us.user_IdUser
         JOIN UserMedical um ON u.user_IdMedical = um.user_IdMedical
    LEFT JOIN (SELECT * FROM UserCapacity uc 
              GROUP BY uc.user_IdUser) uc ON uc.user_IdUser = us.user_IdUser
         JOIN Programs p ON p.prog_IdProgram = us.prog_IdProgram
         JOIN InsModes im ON im.ins_IdMode = us.plan_IdMode
         JOIN UserStudies us2 ON us2.user_IdStudy = u.user_IdStudy
         JOIN UserAddress ua ON ua.user_IdAddress = u.user_IdAddress
         JOIN OrgLocal ol ON ol.org_IdLocal = us.org_IdLocal
         JOIN OrgCampus oc ON oc.org_IdCampus = us.org_IdCampus 
        WHERE us.tecnm ='s';`,
  getMatriculaCoreBackup: `
          SELECT us.code AS nocontrol, u.curp AS curp, u.state AS lugarNacimiento,
          u.name AS nombre, u.firstName AS primerApellido, u.secondName AS segundoApellido,
          um.code AS seguro, u.gender AS genero, '' AS celular, '' AS correo,
          IF(uc.p10 = 'SI', 'S', 'N') AS indigena, p.code AS carrera, im.name AS modalidad,
          us2.name AS estudios, ua.state AS entidad, ua.city AS municipio, 
          ol.name AS nombreUReal, oc.name AS nombreUOficial, 
          uc.dp1 AS discapacidad, us.sem AS semestre, us.opc AS status
     FROM Users u
     JOIN UserStudents us ON u.user_IdUser = us.user_IdUser
     JOIN UserMedical um ON u.user_IdMedical = um.user_IdMedical
LEFT JOIN (SELECT * FROM UserCapacity uc 
          GROUP BY uc.user_IdUser) uc ON uc.user_IdUser = us.user_IdUser
     JOIN Programs p ON p.prog_IdProgram = us.prog_IdProgram
     JOIN InsModes im ON im.ins_IdMode = us.plan_IdMode
     JOIN UserStudies us2 ON us2.user_IdStudy = u.user_IdStudy
     JOIN UserAddress ua ON ua.user_IdAddress = u.user_IdAddress
     JOIN OrgLocal ol ON ol.org_IdLocal = us.org_IdLocal
     JOIN OrgCampus oc ON oc.org_IdCampus = us.org_IdCampus 
    WHERE us.ins =1;`,
  getMatriculaData: `
       SELECT de.nocontrol, de.curp, de.lugarNacimiento, de.nombre, de.primerApellido,
              de.segundoApellido, de.seguro, de.genero, de.celular, de.correo, 
              de.indigena, dc.clave AS carrera, dm.nombre AS modalidad, 
              de2.nombre AS estudios, dp.estado AS entidad, dp.municipio, 
              du.nombre AS nombreUReal, du2.nombre AS nombreUOficial, 
              dd.nombre AS discapacidad, fm.semestre, fm.estatus AS status
         FROM FactMatricula fm 
         JOIN DimEstudiante de ON de.idEstudiante = fm.idEstudiante
         JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
         JOIN DimModalidades dm ON dm.idModalidad = fm.idModalidad 
    LEFT JOIN DimEstudios de2 ON de2.idEstudio = fm.idEstudio 
    LEFT JOIN DimProcedencia dp ON dp.idProcedencia = fm.idProcedencia 
         JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
         JOIN DimUnidades du2 ON du2.idUnidad = fm.idUnidadOficial 
    LEFT JOIN DimDiscapacidades dd ON dd.IdDiscapacidad = fm.idDiscapacidad 
         JOIN DimFecha df ON df.idFecha = fm.idFechaInicio 
    LEFT JOIN DimFecha df2 ON df2.idFecha = fm.idFechaTermino
    WHERE ISNULL(fm.idFechaTermino)`,
  setMatricula: `
    INSERT INTO FactMatricula (idMatricula, idEstudiante, idCarrera, idModalidad, idEstudio, idProcedencia, 
                idUnidadReal, idUnidadOficial, idDiscapacidad, idFechaInicio, idFechaTermino, semestre, estatus)
         VALUES (0, :idEstudiante, :idCarrera, :idModalidad, :idEstudio, :idProcedencia, 
                :idUnidadReal, :idUnidadOficial, :idDiscapacidad, :idFechaInicio, :idFechaTermino, :semestre, :status);`,
  upMatriculaFechaTermino: `
    UPDATE FactMatricula
       SET idFechaTermino = :idFecha
     WHERE idMatricula = :idMatricula;`,
  getUltimaMatriculaEstudiante: `
    SELECT MAX(idMatricula) as matricula
      FROM FactMatricula
     WHERE idEstudiante = :idEstudiante`,
  getDuplicados: `
      SELECT MIN(fm.idMatricula) AS idMatricula, de.idEstudiante 
        FROM FactMatricula fm
        JOIN DimEstudiante de ON de.idEstudiante = fm.idEstudiante
       WHERE ISNULL(fm.idFechaTermino)
         AND de.nocontrol
              IN (SELECT de2.nocontrol
                    FROM FactMatricula fm2
                    JOIN DimEstudiante de2 ON de2.idEstudiante = fm2.idEstudiante
                   WHERE ISNULL(fm2.idFechaTermino)
                GROUP BY de2.nocontrol
                  HAVING COUNT(*) > 1)
    GROUP BY de.nocontrol
    ORDER BY de.nocontrol;`,
  getMatriculaUnidadReal: `
      SELECT du.nombre AS nombre, du.clave AS clave, COUNT(fm.idMatricula) AS cantidad, du.clase
        FROM FactMatricula fm 
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal  
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio 
       WHERE ISNULL(fm.idFechaTermino) 
         AND df.periodo = :periodo 
    GROUP BY fm.idUnidadReal
    ORDER by cantidad;`,
  getMatriculaUnidadRealClase: `
      SELECT du.nombre AS nombre, du.clave AS clave, COUNT(fm.idMatricula) AS cantidad, du.clase
        FROM FactMatricula fm 
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
       WHERE ISNULL(fm.idFechaTermino) 
         AND du.clase = :clase
         AND df.periodo = :periodo
    GROUP BY fm.idUnidadReal
    ORDER by du.nombre;`,
  getMatriculaUnidadOficial: `
      SELECT du.nombre AS nombre, du.clave, COUNT(fm.idMatricula) AS cantidad, du.clase
        FROM FactMatricula fm 
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio 
       WHERE ISNULL(fm.idFechaTermino)
       AND df.periodo = :periodo
    GROUP BY fm.idUnidadOficial 
    ORDER by du.nombre;`,
  getMatriculaReal: `
      SELECT dc.nombre AS nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
        JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
       WHERE ISNULL(fm.idFechaTermino)
         AND du.nombre  = :unidad
         AND df.periodo = :periodo
    GROUP BY fm.idCarrera`,
  getMatriculaOficial: `
      SELECT dc.nombre AS nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial 
        JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
       WHERE ISNULL(fm.idFechaTermino)
         AND du.nombre  = :unidad
         AND df.periodo = :periodo
    GROUP BY fm.idCarrera`,
  getMatriculaUnidadRealF: `
      SELECT du.nombre AS nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
       WHERE fm.idFechaInicio IN (:ids)
         AND (fm.idFechaTermino IS NULL 
              OR fm.idFechaTermino > 
                (SELECT MAX(idFecha)
                   FROM DimFecha 
                  WHERE idFecha IN (:ids)))
         AND df.periodo = :periodo
    GROUP BY du.nombre 
    ORDER BY cantidad DESC;`,
  getMatriculaUnidadOficialF: `
      SELECT du.nombre AS nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial
        WHERE fm.idFechaInicio IN (:ids)
          AND (fm.idFechaTermino IS NULL 
              OR fm.idFechaTermino > 
                (SELECT MAX(idFecha)
                    FROM DimFecha 
                  WHERE idFecha IN (:ids)))
    GROUP BY du.nombre 
    ORDER BY du.nombre;`,
  getMatriculaRealF: `
      SELECT dc.nombre AS nombre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
        JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
       WHERE fm.idFechaInicio IN (:ids)
         AND (fm.idFechaTermino IS NULL 
              OR fm.idFechaTermino > 
              (SELECT MAX(idFecha)
                  FROM DimFecha 
                WHERE idFecha IN (:ids)))
         AND du.nombre  = :unidad
         AND df.periodo = :periodo
    GROUP BY fm.idCarrera
    ORDER BY dc.nombre;`,
  getMatriculaRealCorte: `
      SELECT COUNT(fm.idMatricula) AS estudiantes
        FROM FactMatricula fm
       WHERE fm.idFechaInicio IN (21,22,28,29,30)
         AND (fm.idFechaTermino IS NULL 
              OR fm.idFechaTermino > 
              (SELECT MAX(idFecha)
                  FROM DimFecha 
                WHERE idFecha IN (21,22,28,29,30)));`,
  getPeriodoVariacion:`
    SELECT 
      COALESCE(p2.nombre, p1.nombre) AS Unidad,
      COALESCE(p2.matriculaAnt, 0) AS :periodo_anterior,
      COALESCE(p1.matriculaActual, 0) AS :periodo_actual,
    CASE 
      WHEN COALESCE(p2.matriculaAnt, 0) = 0 THEN 0 
      ELSE ROUND(((COALESCE(p1.matriculaActual, 0) - COALESCE(p2.matriculaAnt, 0)) / COALESCE(p2.matriculaAnt, 1)) * 100, 2) 
      END AS Variación
    FROM 
      (SELECT du.idUnidad, du.nombre, COUNT(fm.idMatricula) AS matriculaActual
      FROM FactMatricula fm
      JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
      JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
      WHERE df.periodo = :periodo_actual
      GROUP BY du.idUnidad, du.nombre) p1
    LEFT JOIN 
      (SELECT du.idUnidad, du.nombre, COUNT(fm.idMatricula) AS matriculaAnt
      FROM FactMatricula fm
      JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
      JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
      WHERE df.periodo = :periodo_anterior
      GROUP BY du.idUnidad, du.nombre) p2
    ON p1.idUnidad = p2.idUnidad;
  `
};

export const getEstatusQuery = (unidad?: string, carrera?: string, ids?: number[]): string => {
  let query = ``;
  if (carrera) {
    query += `
      SELECT dc.nombre, COUNT(fm.idMatricula) AS cantidad, fm.estatus
        FROM FactMatricula fm
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
        JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
       WHERE`;
  } else if (unidad === 'unidad') {
    query += `
      SELECT du.nombre, COUNT(fm.idMatricula) AS cantidad, fm.estatus
        FROM FactMatricula fm
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
       WHERE`;
  } else {
    query += `
      SELECT COUNT(fm.idMatricula) AS cantidad, fm.estatus
        FROM FactMatricula fm
        JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal
        JOIN DimFecha df ON df.idFecha = fm.idFechaInicio
       WHERE`;
  }

  if (ids) {
    query += `
      fm.idFechaInicio IN (:ids)
      AND (fm.idFechaTermino IS NULL 
            OR fm.idFechaTermino > 
              (SELECT MAX(idFecha) 
                 FROM DimFecha 
                WHERE idFecha IN (:ids)))\n`;
  } else {
    query += ` ISNULL(fm.idFechaTermino)\n`;
  }

  query += `AND df.periodo = :periodo\n`

  if (unidad && unidad != 'unidad') {
    query += ` AND du.nombre = :unidad\n`;
  }

  query += ` GROUP BY fm.estatus`;

  if (carrera) {
    query += `, dc.nombre`;
  }

  if (unidad) {
    query += `, du.nombre`;
  }

  query += ` ORDER BY`;

  if (carrera) {
    query += ` dc.nombre,`;
  }

  if (unidad) {
    query += ` du.nombre,`;
  }

  query += ` fm.estatus`;

  return query;
};

export const getSemestreQuery = (unidad?: string, carreras?: string, ids?: number[]): string => {
  let query = `SELECT `;

  if (unidad) query += `du.nombre AS unidad,`;

  if (carreras) query += `dc.clave, dc.abreviacion, dc.nombre AS carrera,`;

  query += ` fm.semestre, COUNT(fm.idMatricula) AS cantidad
        FROM FactMatricula fm
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

  query += `GROUP BY fm.semestre `;

  if (carreras) query += `, dc.nombre `;

  query += `\nORDER BY `;

  if (carreras) query += ` dc.nombre,`;

  query += `fm.semestre`;

  return query;
};

export const getTotalQuery = (ids?: number[], unidad?: string): string => {
  let query = `SELECT COUNT(fm.idMatricula) AS estudiantes
                 FROM FactMatricula fm
                 JOIN DimFecha df ON df.idFecha = fm.idFechaInicio\n`;

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

  return query;
}

export const getPeriodoQuery = (ids?: number[], unidad?: string): string => {
  let query = `SELECT df.periodo, COUNT(fm.idMatricula) AS estudiantes
               FROM FactMatricula fm 
               JOIN DimFecha df ON df.idFecha = fm.idFechaInicio\n`;

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

  if (unidad) {
    query += `AND du.nombre = :unidad`;
  }
  query += `GROUP BY df.periodo`
  return query;
}