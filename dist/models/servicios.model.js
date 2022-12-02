"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicio = void 0;
const mongoose_1 = require("mongoose");
const servicioSchema = new mongoose_1.Schema({
    auto: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Auto',
        required: [true, 'Faltan campos por completar']
    },
    tipo: {
        type: String,
        required: [true, 'Faltan campos por completar']
    },
    llegada: {
        type: Date,
    },
    salida: {
        type: Date,
        default: ''
    },
    problema: {
        type: String,
        default: ''
    },
    avance: {
        type: String,
        default: ''
    },
    detalle: [{
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
        }],
    garantia: {
        type: Number,
        default: 0
    },
    gasto: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    estatus: {
        type: String,
        required: [true, 'Faltan campos por completar']
    },
});
servicioSchema.pre('save', function (next) {
    this.llegada = new Date();
    next();
});
exports.Servicio = (0, mongoose_1.model)('Servicio', servicioSchema);
