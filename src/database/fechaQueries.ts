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
     WHERE date_idCalendar = 79`,
  getIdsFechas: `
       SELECT idFecha 
         FROM DimFecha 
        WHERE CONCAT(anio, '-', mes, '-', dia)
      BETWEEN :fechaInicio AND :fechaFin`,
  getAllFechas: `
    SELECT * 
      FROM DimFecha
     WHERE periodo = :periodo`
}