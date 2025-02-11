export const queries = {
  getFechaAct: `
    SELECT df.idFecha AS id
      FROM DimFecha df 
     WHERE dia = LPAD(DATE_FORMAT(NOW(), '%e'), 2, '0')
       AND mes = LOWER(DATE_FORMAT(NOW(), '%M'))
       AND anio = DATE_FORMAT(NOW(), '%Y');`,
  getDate: `
    SELECT LPAD(DATE_FORMAT(NOW(), '%e'), 2, '0') AS dia,
           LOWER(DATE_FORMAT(NOW(), '%M')) AS mes, 
           DATE_FORMAT(NOW(), '%Y') AS anio;`,
  getLast: `
      SELECT CONCAT_WS(" ", df.dia, df.mes, df.anio) AS ultimaFecha
        FROM FactCaptacion fc
        JOIN DimFecha df ON df.idFecha = fc.idFechaInicio
    ORDER BY fc.idFechaInicio DESC
       LIMIT 1;`,
  getFecha: `
    SELECT *
      FROM DimFecha df
     WHERE df.idFecha = :id`,
  setEspanol: `
    SET lc_time_names = 'es_ES';`,
  getIdioma: `SHOW VARIABLES LIKE 'lc_time_names';`,
  setFechaAct: `
    INSERT INTO DimFecha 
         VALUES (NULL,
                 LPAD(DATE_FORMAT(NOW(),'%e'),2,0), 
                 LOWER(DATE_FORMAT(NOW(),'%M')), 
                 DATE_FORMAT(NOW(),'%Y'), 
                 :period, 'Control')`,
  getPeriodo: `
    SELECT CONCAT(dc.startYear, dc.code) AS periodo
    FROM DateCalendars dc
    ORDER BY dc.date_idCalendar DESC
    LIMIT 1`,
    getIdsFechas: `
    SELECT idFecha 
      FROM DimFecha 
     WHERE CONCAT(anio, '-',
                  CASE 
                     WHEN mes = 'enero' THEN '1'
                     WHEN mes = 'febrero' THEN '2'
                     WHEN mes = 'marzo' THEN '3'
                     WHEN mes = 'abril' THEN '4'
                     WHEN mes = 'mayo' THEN '5'
                     WHEN mes = 'junio' THEN '6'
                     WHEN mes = 'julio' THEN '7'
                     WHEN mes = 'agosto' THEN '8'
                     WHEN mes = 'septiembre' THEN '9'
                     WHEN mes = 'octubre' THEN '10'
                     WHEN mes = 'noviembre' THEN '11'
                     WHEN mes = 'diciembre' THEN '12'
                  END,
                  '-', dia
             ) 
           BETWEEN :fechaInicio AND :fechaFin
        AND periodo = :periodo`,
  getAllFechas: `
    SELECT * 
      FROM DimFecha
     WHERE periodo = :periodo`,
  getPeriodos: 'SELECT DISTINCT periodo FROM DimFecha'
}