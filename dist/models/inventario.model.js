"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario = void 0;
const mongoose_1 = require("mongoose");
const inventarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Faltan campos por completar']
    },
    marca: {
        type: String,
        default: ''
    },
    modelo: {
        type: String,
        default: ''
    },
    ubicacion: {
        type: String,
        required: [true, 'Faltan campos por completar']
    },
    costo: {
        type: Number,
        required: [true, 'Faltan campos por completar']
    },
    precio: {
        type: Number,
        required: [true, 'Faltan campos por completar']
    },
    descripcion: {
        type: String,
        default: ''
    },
    unidades: {
        type: Number,
        default: 0
    },
    tipo: {
        type: String,
        required: [true, 'Faltan campos por completar']
    },
});
exports.Inventario = (0, mongoose_1.model)('Inventario', inventarioSchema);
