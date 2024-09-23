"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = {
    getFechaAct: `
    SELECT df.idFecha AS id
      FROM DimFecha df
     WHERE df.dia = LPAD(DATE_FORMAT(NOW(),'%e'),2,0)
       AND df.mes = LOWER(DATE_FORMAT(NOW(),'%M'))
       AND df.anio = DATE_FORMAT(NOW(),'%Y')`,
    getFecha: `
    SELECT *
      FROM DimFecha df
     WHERE df.idFecha = :id`,
    setEspanol: `
    SET lc_time_names = 'es_ES'`,
    setFechaAct: `
    INSERT INTO DimFecha 
         VALUES (NULL,
                 LPAD(DATE_FORMAT(NOW(),'%e'),2,0), 
                 LOWER(DATE_FORMAT(NOW(),'%M')), 
                 DATE_FORMAT(NOW(),'%Y'), 
                 :period)`,
    getPeriodo: `
    SELECT CONCAT(dc.startYear, dc.code) AS periodo 
      FROM DateCalendars dc 
     WHERE status = 'ACTIVO'`,
    getIdsFechas: `
       SELECT idFecha 
         FROM DimFecha 
        WHERE CONCAT(anio, '-', mes, '-', dia)
      BETWEEN :fechaInicio AND :fechaFin`,
    getAllFechas: `
    SELECT * 
      FROM DimFecha
     WHERE periodo = :periodo`
};
