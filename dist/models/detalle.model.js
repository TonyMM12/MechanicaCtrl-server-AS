"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle = void 0;
const mongoose_1 = require("mongoose");
const detalleSchema = new mongoose_1.Schema({
    producto: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Inventario',
        required: [true, 'Faltan campos por completar']
    },
    cantidad: {
        type: Number,
        required: [true, 'Se requiere un numero de contacto'],
        default: 1
    },
    precio: {
        type: Number,
        required: [true, 'Se requiere un numero de contacto']
    },
    subtotal: {
        type: Number,
        required: [true, 'Se requiere un numero de contacto']
    },
});
exports.Detalle = (0, mongoose_1.model)('Detalle', detalleSchema);
