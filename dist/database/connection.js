"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.dataDB = exports.coreDB = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const coreDB = new sequelize_1.Sequelize(process.env.CORE_DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
});
exports.coreDB = coreDB;
const dataDB = new sequelize_1.Sequelize(process.env.DATA_DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
});
exports.dataDB = dataDB;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield coreDB.authenticate();
        console.log('Connected to core database successfully.');
        yield dataDB.authenticate();
        console.log('Connected to data database successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the databases:', error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
