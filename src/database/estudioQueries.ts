export const queries = {
  getIdEstudioData: `
        SELECT idEstudio AS id
FROM DimEstudios
WHERE nombre LIKE :escuela;`,
  getEstudioData: `
        SELECT *
FROM DimEstudios
WHERE idEstudio = :id;`,
  getEstudioCore: `
        SELECT us2.name AS estudios
          FROM Users u
          JOIN UserStudents us ON u.user_IdUser = us.user_IdUser
          JOIN UserStudies us2 ON us2.user_IdStudy = u.user_IdStudy 
         WHERE us.code = :ncontrol;`,
  setEstudioData: `
        INSERT INTO DimEstudios (idEstudio, clave, nombre, estado, municipio, nivel, tipo)
             VALUES (0, :clave, :nombre, :estado, :municipio, :nivel, :tipo);`
}