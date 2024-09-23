"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactMatriculaController_1 = require("./controllers/FactMatriculaController");
// Simular el objeto de respuesta
const res = {
    status: function (code) {
        console.log(`Status: ${code}`);
        return this;
    },
    json: function (data) {
        console.log('Data:', data);
    }
};
// Simula la llamada al controlador
(0, FactMatriculaController_1.fetchMatriculaData)({}, res).catch(error => {
    console.error('Error durante la ejecución de la consulta:', error);
});
