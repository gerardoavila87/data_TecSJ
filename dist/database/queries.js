"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatriculaQuery = void 0;
exports.getMatriculaQuery = `
SELECT us.code AS nocontrol, u.curp AS curp, u.name AS nombre, u.firstName AS paterno , 
u.secondName AS materno , us.sem AS semestre, u.gender AS genero , um.code AS seguro , 
u.cellPhone AS telefono, u.email AS correo , uc.dp1  AS discapacidad , uc.p10  AS indigena, 
p.code AS carrera,  im.name AS modalidad, oc.name AS unidadReal,
oc2.name AS unidadOficial, ol.name AS extension , NOW() AS fecha, '2024A' AS periodo
FROM Users u
JOIN UserStudents us ON u.user_IdUser = us.user_IdUser
JOIN UserMedical um ON u.user_IdMedical = um.user_IdMedical
JOIN Programs p ON p.prog_IdProgram = us.prog_IdProgram
JOIN InsModes im ON im.ins_IdMode = us.plan_IdMode
JOIN OrgCampus oc ON oc.org_IdCampus = us.org_IdCampus
JOIN OrgCampus oc2 ON oc2.org_IdCampus = us.plantel
JOIN OrgLocal ol ON ol.org_IdLocal = us.org_IdLocal 
JOIN UserCapacity uc ON uc.user_IdUser = us.user_IdUser
WHERE us.ins = 1;
`;
