export const queries = {
    getIdAspiranteData:`
        SELECT MAX(da.idAspirante) AS id
          FROM DimAspirantes da
         WHERE da.curp = :curp;`,
    setAspiranteData:`
        INSERT INTO DimAspirantes
                    (idAspirante, curp, nombre, primerApellido, 
                    segundoApellido, lugarNacimiento, genero, indigena)
              VALUES(0, :curp, :nombre, :primerApellido, 
                    :segundoApellido, :lugarNacimiento, :genero, :indigena);`
};