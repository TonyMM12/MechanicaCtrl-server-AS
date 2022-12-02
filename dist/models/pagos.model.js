"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pago = void 0;
const mongoose_1 = require("mongoose");
const pagoSchema = new mongoose_1.Schema({
    empleado: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Empleado",
        required: [true, "Faltan campos por completar"],
    },
    dias: {
        type: Number,
        required: [true, "Faltan campos por completar"],
    },
    horas: {
        type: Number,
        required: [true, "Faltan campos por completar"],
    },
    extras: {
        type: Number,
        required: [true, "Faltan campos por completar"],
    },
    inicio: {
        type: Date,
        required: [true, "Faltan campos por completar"],
    },
    fin: {
        type: Date,
        required: [true, "Faltan campos por completar"],
    },
    impuestos: {
        type: Number,
        default: null,
    },
    ss: {
        type: Number,
        default: null,
    },
    subtotal: {
        type: Number,
        required: [true, "Faltan campos por completar"],
    },
    total: {
        type: Number,
        required: [true, "Faltan campos por completar"],
    },
    fecha: {
        type: Date,
    },
    status: {
        type: String,
        required: [true, 'Faltan campos por completar']
    },
});
pagoSchema.pre('save', function (next) {
    this.fecha = new Date();
    next();
});
exports.Pago = (0, mongoose_1.model)("Pago", pagoSchema);
