"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const mongoose_1 = require("mongoose");
const ventaSchema = new mongoose_1.Schema({
    cliente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true, 'Faltan campos por completar']
    },
    fecha: {
        type: Date,
    },
    detalle: [{
            producto: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Inventario',
                required: [true, 'Faltan campos por completar']
            },
            cantidad: {
                type: Number,
                required: [true, 'Se requiere la cantidad'],
                default: 1
            },
            precio: {
                type: Number,
                required: [true, 'Se requiere un precio']
            },
            subtotal: {
                type: Number,
                required: [true, 'Se requiere un subtotal']
            },
        }],
    total: {
        type: Number,
        required: [true, 'Se requiere un numero de contacto']
    },
});
ventaSchema.pre('save', function (next) {
    this.fecha = new Date();
    next();
});
exports.Venta = (0, mongoose_1.model)('Venta', ventaSchema);
