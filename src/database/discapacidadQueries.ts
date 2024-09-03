export const queries = {
  getIdDiscapacidadData: `
        SELECT IdDiscapacidad as id
          FROM DimDiscapacidades
         WHERE nombre = :discapacidad;`,
  getDiscapacidadData: `
        SELECT nombre 
          FROM DimDiscapacidades
         WHERE IdDiscapacidad = :id;`,
  getDiscapacidadCore: `
           SELECT uc.dp1 AS discapacidad
             FROM UserStudents us
        LEFT JOIN UserCapacity uc ON uc.user_IdUser = us.user_IdUser
            WHERE us.code = :control;`,
  setDiscapacidadData: `
        INSERT INTO DimDiscapacidades (IdDiscapacidad, nombre)
             VALUES (NULL, :discapacidad);`,
  getAllDiscapacidades: ``,
  getDiscapacidadesU: ``,
  getDiscapacidadesC: ``
}