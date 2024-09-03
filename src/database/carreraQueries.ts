export const queries = {
    getIdCarreraData: `
        SELECT idCarrera AS id
          FROM DimCarreras dc
         WHERE clave = :clave;`,
    getClaveCarreraData: `
        SELECT clave 
        FROM DimCarreras dc
        WHERE idCarrera = :id;`,
    getClaveCarreraCore: `
        SELECT p.code AS clave
          FROM UserStudents us
          JOIN Programs p ON p.prog_IdProgram = us.prog_IdProgram
         WHERE us.code = :control;`,
    setCarreraData: `
        INSERT INTO DimCarreras (idCarrera, clave, abreviacion, nombre)
             VALUES (0, :clave, :abreviacion, :nombre);`,
    getAllCarrerasO: `
          SELECT dc.nombre 
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE du.nombre = :unidad
        GROUP BY fm.idCarrera
             `,
    getCarreraUnidadO: `
          SELECT dc.nombre, COUNT(fm.idMatricula) AS cantidad
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadOficial 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE du.nombre = :unidad
        GROUP BY fm.idCarrera
             `,
    getAllCarrerasR: `
          SELECT dc.nombre 
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE du.nombre = :unidad
        GROUP BY fm.idCarrera
             `,
    getCarreraUnidadR: `
          SELECT dc.nombre, COUNT(fm.idMatricula) AS cantidad
            FROM FactMatricula fm 
            JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal 
            JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera 
           WHERE du.nombre = :unidad
        GROUP BY fm.idCarrera
             `
}