"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class FactMatricula extends sequelize_1.Model {
}
FactMatricula.init({
    idMatricula: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nocontrol: sequelize_1.DataTypes.STRING,
    curp: sequelize_1.DataTypes.STRING,
    nombre: sequelize_1.DataTypes.STRING,
    paterno: sequelize_1.DataTypes.STRING,
    materno: sequelize_1.DataTypes.STRING,
    semestre: sequelize_1.DataTypes.TINYINT,
    genero: sequelize_1.DataTypes.CHAR(1),
    seguro: sequelize_1.DataTypes.STRING,
    telefono: sequelize_1.DataTypes.STRING,
    correo: sequelize_1.DataTypes.STRING,
    discapacidad: sequelize_1.DataTypes.STRING,
    indigena: sequelize_1.DataTypes.CHAR(1),
    carrera: sequelize_1.DataTypes.CHAR(4),
    modalidad: sequelize_1.DataTypes.STRING,
    unidadReal: sequelize_1.DataTypes.CHAR(2),
    unidadOficial: sequelize_1.DataTypes.CHAR(2),
    extension: sequelize_1.DataTypes.STRING,
    fecha: sequelize_1.DataTypes.DATE,
    periodo: sequelize_1.DataTypes.CHAR(5),
}, {
    sequelize: connection_1.dataDB,
    tableName: 'FactMatricula',
});
exports.default = FactMatricula;
