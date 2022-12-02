"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
const mongoose_1 = require("mongoose");
const autoSchema = new mongoose_1.Schema({
    cliente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true, 'Faltan campos por completar']
    },
    placa: {
        type: String,
        unique: true,
        default: ''
    },
    marca: {
        type: String,
        required: [true, 'Faltan campos por completar']
    },
    modelo: {
        type: String,
        required: [true, 'Faltan campos por completar']
    },
    color: {
        type: String,
        default: ''
    },
    anio: {
        type: Number,
        required: [true, 'Faltan campos por completar']
    },
    transmicion: {
        type: String,
        default: ''
    },
    identificadorUnico: {
        type: String,
        default: ''
    },
});
exports.Auto = (0, mongoose_1.model)('Auto', autoSchema);
