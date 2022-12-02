"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleServicio = void 0;
const mongoose_1 = require("mongoose");
const detalleServicioSchema = new mongoose_1.Schema({
    producto: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Producto',
        //required: [true,'Faltan campos por completar']
    },
    cantidad: {
        type: Number,
        required: [true, 'Faltan campos por completar']
    },
    costo: {
        type: Number,
        required: [true, 'Faltan campos por completar']
    },
    subtotal: {
        type: Number,
        required: [true, 'Faltan campos por completar']
    },
    area: {
        type: String,
        default: ''
    },
    mecanico: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Empleado',
        //required: [true,'Faltan campos por completar']
    }
});
exports.DetalleServicio = (0, mongoose_1.model)('DetalleServicio', detalleServicioSchema);
