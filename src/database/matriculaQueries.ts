import { getMatricula, getMatriculaUnidadOficial } from "../services/FactMatriculaService";

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
            JOIN OrgCampus oc ON oc.org_IdCampus = us.plantel
           WHERE us.ins = 1;`,
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
    WHERE ISNULL(fm.idFechaTermino)
       `,
     setMatricula: `
        INSERT INTO FactMatricula (idMatricula, idEstudiante, idCarrera, idModalidad, idEstudio, idProcedencia, 
                    idUnidadReal, idUnidadOficial, idDiscapacidad, idFechaInicio, idFechaTermino, semestre, estatus)
             VALUES (0, :idEstudiante, :idCarrera, :idModalidad, :idEstudio, :idProcedencia, 
                    :idUnidadReal, :idUnidadOficial, :idDiscapacidad, :idFechaInicio, :idFechaTermino, :semestre, :estatus);`,
     upMatriculaFechaTermino: `
              UPDATE FactMatricula
              SET idFechaTermino = :idFecha
            WHERE idEstudiante = :idEstudiante
              AND idMatricula = (
                     SELECT MAX(idMatricula)
                       FROM FactMatricula
                      WHERE idEstudiante = :idEstudiante
                     );`,
     getMatriculaUnidadReal: `
              SELECT du.nombre AS nombre, COUNT(fm.idMatricula) AS cantidad
                FROM FactMatricula fm 
                JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal  
               WHERE ISNULL(fm.idFechaTermino) 
               GROUP BY fm.idUnidadReal 
               ORDER by du.nombre`,
     getMatriculaUnidadOficial: `
              SELECT du.nombre AS nombre, COUNT(fm.idMatricula) AS cantidad
                FROM FactMatricula fm 
                JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial  
               WHERE ISNULL(fm.idFechaTermino) 
               GROUP BY fm.idUnidadOficial 
               ORDER by du.nombre`,
     getMatriculaReal: `
          SELECT dc.nombre AS nombre, COUNT(fm.idMatricula) AS cantidad
            FROM FactMatricula fm
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE ISNULL(fm.idFechaTermino)
             AND du.nombre  = :unidad
           GROUP BY fm.idCarrera`,
     getMatriculaOficial: `
           SELECT dc.nombre AS nombre, COUNT(fm.idMatricula) AS cantidad
             FROM FactMatricula fm
             JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial 
             JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
            WHERE ISNULL(fm.idFechaTermino)
              AND du.nombre  = :unidad
            GROUP BY fm.idCarrera`
}