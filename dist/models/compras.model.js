"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compra = void 0;
const mongoose_1 = require("mongoose");
const compraSchema = new mongoose_1.Schema({
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
        required: [true, 'Se requiere un total']
    },
});
compraSchema.pre('save', function (next) {
    this.fecha = new Date();
    next();
});
exports.Compra = (0, mongoose_1.model)('Compra', compraSchema);
