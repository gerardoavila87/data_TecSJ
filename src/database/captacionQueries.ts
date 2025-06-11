export const queries = {
    getCaptacionCore: `
            WITH UnitsUnicas AS ( SELECT code, MIN(name) AS name
                                FROM STA.Units
                                GROUP BY code
                                )
            SELECT sh.curp, sh.name AS nombre, sh.firstName AS primerApellido,
                sh.secondName AS segundoApellido, sh.birthState AS lugarNacimiento,
                sh.sex AS genero, 'N' AS indigena, CASE WHEN sh.extension='ATEMAJAC' THEN 'ATEMAJAC DE BRIZUELA' ELSE sh.extension END AS unidadReal,
                sh.unit AS unidadOficial, sh.program AS carrera, sh.period AS periodo,
                'N' AS discapacidad, sh.status AS estatus,
                COALESCE(u3.name, u2.name) AS estudios, sh.mode AS modalidad,
                p.q1 AS municipio, p.o1 AS estado, sh.pago1 AS pagoExamen, 
                sh.pago2 AS pagoInscripcion, sh.docs AS docsEntregados, 
                sh.ins AS inscripcionCompleta, p.q4 AS medioCaptacion 
            FROM STA.StakeHolders sh
            LEFT JOIN QUI.Promos p ON p.curp = sh.curp
            LEFT JOIN UnitsUnicas u2 ON u2.code = p.q2 AND p.q2 != 'OTRO'
            LEFT JOIN (SELECT code, name 
                        FROM STA.Units 
                        WHERE code = 'OTRO'
                        LIMIT 1) u3 ON p.q2 = 'OTRO' WHERE sh.period = '2025A';`,
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
        LEFT JOIN DimProcedencia dp ON dp.idProcedencia = fc.idProcedencia
        WHERE fc.idFechaTermino IS NULL
      AND fc.periodo = '2025A';`,
    getUltimaCaptacionAspirante: `
        SELECT MAX(idCaptacion) as idCaptacion
          FROM FactCaptacion fc 
         WHERE idAspirante = :idAspirante;`,
    upCaptacionFechaTermino: `
        UPDATE FactCaptacion
           SET idFechaTermino = :idFecha
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
    getMaxPeriodo: `
          SELECT fc.periodo 
            FROM FactCaptacion fc
        GROUP BY fc.periodo
        ORDER BY SUBSTRING(fc.periodo, 1, 4) DESC,
                 CASE
                     WHEN SUBSTRING(fc.periodo, 5, 1) = 'A' THEN 1
                     WHEN SUBSTRING(fc.periodo, 5, 1) = 'B' THEN 2
                     ELSE 3
                 END
           LIMIT 1;`,
    getCaptacionFecha: `
          SELECT CONCAT_WS(" - ",df.dia, df.mes) AS fecha, COUNT(fc.idCaptacion) AS cantidad
            FROM FactCaptacion fc 
            JOIN DimFecha df ON df.idFecha = fc.idFechaInicio 
           WHERE fc.idFechaTermino IS NULL 
             AND fc.periodo = :periodo
        GROUP BY df.idFecha;`,
    getCaptacionExamen: `
           SELECT du.nombre AS nombre, du.clave AS clave, 
                  COUNT(fc.idCaptacion) AS registros, 
                  SUM(CASE WHEN dec2.estatus = 'EXAMEN PAGADO' THEN 1 ELSE 0 END) AS examenPagado
             FROM FactCaptacion fc
        LEFT JOIN DimUnidades du ON du.idUnidad = fc.IdUnidadReal
        LEFT JOIN DimCarreras dc ON dc.idCarrera = fc.idCarrera
        LEFT JOIN DimEstatusCaptacion dec2 ON dec2.idEstatus = fc.idEstatus
            WHERE fc.idFechaTermino IS NULL 
              AND fc.periodo = :periodo
         GROUP BY du.idUnidad, du.nombre, du.clave
         ORDER BY du.nombre;`
};

export const getCaptacion = (filtro?: string, unidad?: string, carreras?: string): string => {
    let selectFields = ['COUNT(fc.idCaptacion) AS cantidad'];
    let joins = [
        'LEFT JOIN DimUnidades du ON du.idUnidad = fc.IdUnidadReal',
        'LEFT JOIN DimCarreras dc ON dc.idCarrera = fc.idCarrera',
        'LEFT JOIN DimEstatusCaptacion dec2 ON dec2.idEstatus = fc.idEstatus'
    ];
    let whereConditions = ['fc.idFechaTermino IS NULL'];
    let groupByFields = [];
    let orderByFields = ['du.nombre'];
    if (filtro !== 'periodo') {
        whereConditions.push('fc.periodo = :periodo');
    }
    if (unidad || filtro === 'unidad') {
        selectFields.unshift(`du.nombre AS nombre, du.clave AS clave, du.clase, 
                              SUM(CASE WHEN dec2.estatus = 'EXAMEN PAGADO'
                              THEN 1 ELSE 0 END) AS examenPagado`);
        groupByFields.push('du.nombre');
    }
    if (carreras) {
        selectFields.unshift(`dc.nombre AS programa, dc.clave AS clave,
                              SUM(CASE WHEN dec2.estatus = 'EXAMEN PAGADO'
                              THEN 1 ELSE 0 END) AS examenPagado,
                              ROUND((SUM(CASE WHEN dec2.estatus = 'EXAMEN PAGADO' 
  				              THEN 1 ELSE 0 END)/COUNT(fc.idCaptacion))*100,2) AS porcentajePagado`);
        groupByFields.push('fc.idCarrera');
        orderByFields.push('dc.nombre');
    }

    switch (filtro) {
        case 'lugar':
            selectFields.unshift('da.lugarNacimiento');
            joins.push('JOIN DimAspirantes da ON da.idAspirante = fc.idAspirante');
            groupByFields.push('da.lugarNacimiento');
            orderByFields.push('da.lugarNacimiento');
            break;
        case 'genero':
            selectFields.unshift('da.genero');
            joins.push('JOIN DimAspirantes da ON da.idAspirante = fc.idAspirante');
            groupByFields.push('da.genero');
            orderByFields.push('da.genero');
            break;
        case 'indigena':
            selectFields.unshift('da.indigena');
            joins.push('JOIN DimAspirantes da ON da.idAspirante = fc.idAspirante');
            groupByFields.push('da.indigena');
            orderByFields.push('da.indigena');
            break;
        case 'modalidad':
            selectFields.unshift('dm.nombre AS modalidad');
            joins.push('JOIN DimModalidades dm ON dm.idModalidad = fc.idModalidad');
            groupByFields.push('fc.idModalidad');
            orderByFields.push('dm.nombre');
            break;
        case 'procedencia':
            selectFields.unshift('dp.estado, dp.municipio');
            joins.push('JOIN DimProcedencia dp ON dp.idProcedencia = fc.idProcedencia');
            groupByFields.push('fc.idProcedencia');
            orderByFields.push('dp.estado', 'dp.municipio');
            break;
        case 'estudio':
            selectFields.unshift('de.nombre AS escuela');
            joins.push('LEFT JOIN DimEstudios de ON de.idEstudio = fc.idEstudio');
            groupByFields.push('fc.idEstudio');
            orderByFields.push('de.nombre');
            break;
        case 'discapacidad':
            selectFields.unshift('dd.nombre AS discapacidad');
            joins.push('LEFT JOIN DimDiscapacidades dd ON dd.IdDiscapacidad = fc.idDiscapacidad');
            groupByFields.push('fc.idDiscapacidad');
            orderByFields.push('dd.nombre');
            break;
        case 'estatus':
            selectFields.unshift('dec2.estatus');
            groupByFields.push('fc.idEstatus');
            orderByFields.push('cantidad DESC');
            break;
        case 'examen':
            selectFields.unshift(`IF(fc.pagoExamen=1,'Con pago', 'Sin pago') AS pagoExamen`);
            groupByFields.push('fc.pagoExamen');
            orderByFields.push('fc.pagoExamen');
            break;
        case 'pinscripcion':
            selectFields.unshift(`IF(fc.pagoInscripcion =1,'Con pago', 'Sin pago') AS pagoInscripcion`);
            groupByFields.push('fc.pagoInscripcion');
            orderByFields.push('fc.pagoInscripcion');
            break;
        case 'documentos':
            selectFields.unshift(`IF(fc.docsEntregados =1,'Con documentos', 'Sin documentos') AS documentos`);
            groupByFields.push('fc.docsEntregados');
            orderByFields.push('fc.docsEntregados');
            break;
        case 'inscripcionc':
            selectFields.unshift(`IF(fc.inscripcionCompleta =1,'Completa', 'Incompleta') AS inscripcion`);
            groupByFields.push('fc.inscripcionCompleta');
            orderByFields.push('fc.inscripcionCompleta');
            break;
        case 'medio':
            selectFields.unshift(`fc.medioCaptacion`);
            groupByFields.push('fc.medioCaptacion');
            orderByFields.push('fc.medioCaptacion');
            break;
        case 'periodo':
            selectFields.unshift(`fc.periodo`);
            groupByFields.push('fc.periodo');
            orderByFields.push('fc.periodo');
            break;
    }

    if (unidad) {
        whereConditions.push('du.nombre = :unidad');
    }

    if (carreras) {
        whereConditions.push('du.nombre = :carreras');
    }

    let query = `
         SELECT ${selectFields.join(', ')}
         FROM FactCaptacion fc
         ${joins.join('\n')}
         WHERE ${whereConditions.join(' AND ')}
         GROUP BY ${groupByFields.join(', ')}
         ORDER BY ${orderByFields.join(', ')}
     `;
    return query;
};



