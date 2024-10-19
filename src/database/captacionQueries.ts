export const queries = {
    getCaptacionCore: `
        SELECT sh.curp,  sh.name AS nombre, sh.firstName AS primerApellido, 
               sh.secondName AS segundoApellido, sh.birthState AS lugarNacimiento, 
               sh.sex AS genero, 'N' AS indigena, sh.extension AS unidadReal, 
               sh.unit AS unidadOficial, sh.program AS carrera, sh.period AS periodo, 
               'N' AS discapacidad, sh.status AS estatus, p.q2 AS estudios, 
               sh.mode AS modalidad, p.q1 AS municipio, p.o1 AS estado, 
               sh.pago1 AS pagoExamen, sh.pago2 AS pagoInscripcion, sh.docs AS docsEntregados,
               sh.ins AS inscripcionCompleta, p.q4 AS medioCaptacion 
          FROM STA.StakeHolders sh 
          JOIN QUI.Promos p ON p.curp = sh.curp;`,
    getCaptacionData: `
           SELECT da.curp, da.nombre, da.primerApellido, da.segundoApellido, 
                  da.lugarNacimiento, da.genero, da.indigena, du.nombre AS unidadReal, 
                  du2.clave AS unidadOficial, dc.clave AS carrera, fc.periodo,
                  dd.nombre AS discapacidad, dec2.estatus, de.clave AS estudios,
                  dm.nombre AS modalidad, dp.municipio, dp.estado, fc.pagoExamen,
                  fc.pagoInscripcion, fc.docsEntregados, fc.inscripcionCompleta, 
                  fc.medioCaptacion 
             FROM FactCaptacion fc 
             JOIN DimAspirantes da ON da.idAspirante = fc.idAspirante 
             JOIN DimUnidades du ON du.idUnidad = fc.idUnidadReal 
             JOIN DimUnidades du2 ON du2.idUnidad = fc.idUnidadOficial 
             JOIN DimCarreras dc ON dc.idCarrera = fc.idCarrera 
        LEFT JOIN DimDiscapacidades dd ON dd.IdDiscapacidad = fc.idDiscapacidad 
             JOIN DimEstatusCaptacion dec2 ON dec2.idEstatus = fc.idEstatus 
        LEFT JOIN DimEstudios de ON de.idEstudio = fc.idEstudio 
             JOIN DimModalidades dm ON dm.idModalidad = fc.idModalidad 
        LEFT JOIN DimProcedencia dp ON dp.idProcedencia = fc.idProcedencia;`,
    getUltimaCaptacionAspirante: `
        SELECT MAX(idCaptacion) as idCaptacion
          FROM FactCaptacion fc 
         WHERE idAspirante = :idAspirante;`,
    upCaptacionFechaTermino: `
        UPDATE FactCaptacion
           SET IdFechaTermino = :idFecha
         WHERE idCaptacion = :idCaptacion;`,
    setCaptacionData: `
        INSERT INTO FactCaptacion
                    (idCaptacion, idAspirante, idCarrera, idModalidad, idUnidadReal,
                    idUnidadOficial, idProcedencia, idEstudio, idDiscapacidad, idEstatus,
                    pagoExamen, pagoInscripcion, docsEntregados, inscripcionCompleta,
                    medioCaptacion, periodo, idFechaInicio, idFechaTermino)
              VALUES(idCaptacion, :idAspirante, :idCarrera, :idModalidad, :idUnidadReal, 
                    :idUnidadOficial, :idProcedencia, :idEstudio, :idDiscapacidad, :idEstatus, 
                    :pagoExamen, :pagoInscripcion, :docsEntregados, :inscripcionCompleta, 
                    :medioCaptacion, :periodo, :idFechaInicio, :idFechaTermino);`,
    getDuplicados: `
          SELECT MIN(fc.idCaptacion) AS idMatricula, da.idAspirante 
            FROM FactCaptacion fc 
            JOIN DimAspirantes da ON da.idAspirante = fc.idAspirante 
           WHERE ISNULL(fc.idFechaTermino)
             AND da.curp
                 IN (SELECT da2.curp 
                       FROM FactCaptacion fc2
                       JOIN DimAspirantes da2 ON da2.idAspirante = fc2.idAspirante 
                      WHERE ISNULL(fc2.idFechaTermino)
                   GROUP BY da2.curp 
                     HAVING COUNT(*) > 1)
        GROUP BY da.curp
        ORDER BY da.curp;`,
    getAllCaptacion: `
        SELECT COUNT(fc.idCaptacion) AS cantidad
          FROM FactCaptacion fc
         WHERE fc.idFechaTermino IS NULL 
           AND periodo = :periodo;`,
    getCaptacionUnidad: `
          SELECT du.clase, du.clave, du.nombre, COUNT(fc.idCaptacion) AS cantidad
            FROM FactCaptacion fc
            JOIN DimUnidades du ON du.idUnidad = fc.IdUnidadReal 
           WHERE fc.idFechaTermino IS NULL
             AND periodo = :periodo 
        GROUP BY fc.IdUnidadReal;`
};

