"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEstudiantesQuery = exports.queries = void 0;
exports.queries = {
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
};
const getEstudiantesQuery = (tipo, unidad, ids, carreras) => {
    let query = `SELECT `;
    if (unidad)
        query += `du.nombre, `;
    if (carreras)
        query += `dc.clave, dc.abreviacion, dc.nombre, `;
    switch (tipo) {
        case 'genero':
            query += `de.genero, `;
            break;
        case 'lugar':
            query += `de.lugarNacimiento, `;
            break;
        case 'indigena':
            query += `de.indigena, `;
            break;
    }
    query += `COUNT(fm.idMatricula) as cantidad 
       FROM FactMatricula fm
       JOIN DimEstudiante de ON de.idEstudiante = fm.idEstudiante\n`;
    if (unidad || carreras) {
        query += `JOIN DimUnidades du ON du.idUnidad = fm.idUnidadReal\n`;
    }
    if (carreras) {
        query += `JOIN DimCarreras dc ON dc.idCarrera = fm.idCarrera\n`;
    }
    if (Array.isArray(ids) && ids.length > 0) {
        query += `WHERE fm.idFechaInicio IN (:ids) 
              AND (fm.idFechaTermino IS NULL OR fm.idFechaTermino > 
                  (SELECT MAX(idFecha) FROM DimFecha WHERE idFecha IN (:ids)))\n`;
    }
    else {
        query += `WHERE fm.idFechaTermino IS NULL\n`;
    }
    if (unidad && unidad !== 'unidad') {
        query += `AND du.nombre = :unidad\n`;
    }
    if (carreras) {
        query += `AND du.nombre = :carreras\n`;
    }
    if (tipo) {
        query += `GROUP BY `;
        switch (tipo) {
            case 'genero':
                query += `de.genero`;
                break;
            case 'lugar':
                query += `de.lugarNacimiento`;
                break;
            case 'indigena':
                query += `de.indigena`;
                break;
        }
    }
    if (carreras) {
        query += `, dc.idCarrera`;
    }
    if (unidad) {
        query += `, du.idUnidad`;
    }
    query += ` \nORDER BY `;
    if (carreras) {
        query += `dc.idCarrera, `;
    }
    if (unidad) {
        query += `du.nombre, `;
    }
    if (tipo) {
        switch (tipo) {
            case 'genero':
                query += `de.genero`;
                break;
            case 'lugar':
                query += `de.lugarNacimiento`;
                break;
            case 'indigena':
                query += `de.indigena`;
                break;
        }
    }
    return query;
};
exports.getEstudiantesQuery = getEstudiantesQuery;
