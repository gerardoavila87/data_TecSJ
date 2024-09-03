export const queries = {
  getIdProcedenciaData: `
        SELECT idProcedencia AS id
  FROM DimProcedencia
 WHERE LOWER(municipio) = LOWER(:municipio)
   AND LOWER(estado) = LOWER(:estado);
`,
  getProcedenciaData: `
        SELECT municipio, estado
          FROM DimProcedencia
         WHERE idProcedencia = :id;`,
  getProcedenciaCore: `
        SELECT ua.state AS estado, ua.city AS municipio
          FROM Users u
          JOIN UserStudents us ON u.user_IdUser = us.user_IdUser
          JOIN UserAddress ua ON ua.user_IdAddress = u.user_IdAddress 
         WHERE us.code = :ncontrol;`,
  setProcedenciaData: `
        INSERT INTO DimProcedencia (idProcedencia, estado, municipio)
             VALUES (0, :estado, :municipio);`
}