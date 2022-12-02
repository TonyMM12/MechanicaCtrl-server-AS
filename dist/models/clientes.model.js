"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const mongoose_1 = require("mongoose");
const clienteSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },
    telefono: {
        type: Number,
        required: [true, 'Se requiere un numero de contacto']
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
    estado: {
        type: String,
        default: ''
    },
    municipio: {
        type: String,
        default: ''
    },
    cp: {
        type: Number,
        default: 0
    }
});
exports.Cliente = (0, mongoose_1.model)('Cliente', clienteSchema);
