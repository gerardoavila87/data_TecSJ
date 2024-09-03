export const queries = {
  getIdModalidadData: `
        SELECT idModalidad AS id
          FROM DimModalidades
         WHERE nombre = :modalidad;`,
  getModalidadData: `
        SELECT nombre
          FROM DimModalidades
         WHERE idModalidad = :id;`,
  getModalidadCore: `
        SELECT im.name AS nombre
          FROM UserStudents us
          JOIN InsModes im ON im.ins_IdMode = us.plan_IdMode
         WHERE us.code = :ncontrol;`,
  setModalidadData: `
        INSERT INTO DimModalidades (idModalidad, nombre)
             VALUES (0, :nombre);`
}