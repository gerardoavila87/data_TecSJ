"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UnidadController_1 = require("../controllers/UnidadController");
const router = (0, express_1.Router)();
router.get('/unidades/Oficial', UnidadController_1.getAllUnidadO);
router.get('/Unidades/Real', UnidadController_1.getAllUnidadR);
exports.default = router;
