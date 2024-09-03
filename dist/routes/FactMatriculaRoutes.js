"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FactMatriculaController_1 = require("../controllers/FactMatriculaController");
const router = (0, express_1.Router)();
router.get('/matricula', FactMatriculaController_1.fetchMatriculaData);
//router.post('/matricula', createMatriculaRecord);
exports.default = router;
