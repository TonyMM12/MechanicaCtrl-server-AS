"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
const mongoose_1 = require("mongoose");
const empleadoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario ']
    },
    sexo: {
        type: String,
        required: [true, 'EL sexo es necesario ']
    },
    telefono: {
        type: Number,
        required: [true, 'El telefono es necesario ']
    },
    email: {
        type: String,
        default: ''
    },
    domicilio: {
        type: String,
        default: ''
    },
    colonia: {
        type: String,
        default: ''
    },
    municipio: {
        type: String,
        default: ''
    },
    estado: {
        type: String,
        default: ''
    },
    cp: {
        type: Number,
        default: null
    },
    experiencia: {
        type: Number,
        default: null
    },
    puesto: {
        type: String,
        required: [true, 'El puesto es necesario ']
    },
    nacimiento: {
        type: Date,
        format: "%G-%m-%d",
        required: [true, 'La fecha de nacimiento es necesaria ']
    },
    incorporacion: {
        type: Date,
        required: [true, 'La fecha de incorporacion es necesaria ']
    },
    nss: {
        type: String,
        default: ''
    },
    rfc: {
        type: String,
        default: ''
    },
});
exports.Empleado = (0, mongoose_1.model)('Empleado', empleadoSchema);
