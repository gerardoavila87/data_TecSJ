export const queries = {
       getIdEstudianteData: `
        SELECT MAX(idEstudiante) AS id
          FROM DimEstudiante
         WHERE nocontrol = :ncontrol;`,
       getEstudianteData: `
        SELECT *
          FROM DimEstudiante
         WHERE idEstudiante = :id;`,
       getEstudianteCore: `
               SELECT us.code AS nocontrol, u.curp AS curp, u.state AS lugarNacimiento,
                      u.name AS nombre, u.firstName AS primerApellido, u.secondName AS segundoApellido,
                      um.code AS seguro, u.gender AS genero, u.cellPhone AS celular, u.email AS correo,
                      IF(uc.p10 = 'SI', 'S', 'N') AS indigena
                 FROM Users u
                 JOIN UserStudents us ON u.user_IdUser = us.user_IdUser
                 JOIN UserMedical um ON u.user_IdMedical = um.user_IdMedical
            LEFT JOIN UserCapacity uc ON uc.user_IdUser = us.user_IdUser
                WHERE us.code = :ncontrol;`,
       setEstudianteData: `
        INSERT INTO DimEstudiante (idEstudiante, nocontrol, curp, lugarNacimiento, nombre, 
                    primerApellido, segundoApellido, seguro, genero, celular, correo, indigena)
             VALUES (0, :nocontrol, :curp, :lugarNacimiento, :nombre, :primerApellido, 
                    :segundoApellido, :seguro, :genero, :celular, :correo, :indigena);`
}