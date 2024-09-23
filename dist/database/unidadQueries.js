"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = {
    getIdUnidadData: `
    SELECT idUnidad AS id
      FROM DimUnidades
    WHERE nombre = :nombre;`,
    getUnidadData: `
    SELECT * 
      FROM DimUnidades
    WHERE idUnidad = :id;`,
    getUnidadReal: `
    SELECT ol.name AS nombre
      FROM UserStudents us
      JOIN OrgLocal ol ON ol.org_IdLocal = us.org_IdLocal
    WHERE us.code = :ncontrol;`,
    getUnidadOficial: `
    SELECT oc.name AS nombre
      FROM UserStudents us
      JOIN OrgCampus oc ON oc.org_IdCampus = us.plantel
    WHERE us.code = :ncontrol;`,
    setUnidadData: `
    INSERT INTO DimUnidades (idUnidad, clave, nombre)
        VALUES (0, :clave, :nombre);`,
    getAllUnidadReal: `
    SELECT du.clave, du.nombre as unidad,  du.clase, du.estado
    FROM FactMatricula fm 
    JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
    WHERE ISNULL(fm.idFechaTermino)
    GROUP BY fm.idUnidadReal
    ORDER BY du.clase, du.nombre`,
    getAllUnidadOficial: `
    SELECT du.nombre as unidad
    FROM FactMatricula fm 
    JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial
    WHERE ISNULL(fm.idFechaTermino)
    GROUP BY fm.idUnidadOficial`
};
