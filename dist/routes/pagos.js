"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagos_model_1 = require("../models/pagos.model");
const pagoRoutes = (0, express_1.Router)();
//crear pago
pagoRoutes.post('/', (req, res) => {
    const body = req.body;
    pagos_model_1.Pago.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//consultar pago
pagoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pago = yield pagos_model_1.Pago.find()
        .sort({ _id: -1 })
        .limit(10)
        .populate('empleado')
        .exec();
    res.json({
        ok: true,
        get: pago
    });
}));
//Actualizar pago
pagoRoutes.post('/update', (req, res) => {
    const pago = {
        empleado: req.body.empleado,
        dias: req.body.dias,
        horas: req.body.horas,
        extras: req.body.estras,
        inicio: req.body.inicio,
        fin: req.body.fin,
        impuestos: req.body.impuestos,
        ss: req.body.ss,
        subtotal: req.body.subtotal,
        total: req.body.total,
        estatus: req.body.total,
    };
    pagos_model_1.Pago.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe pago'
                });
            }
            res.json({
                ok: true,
                Pago: pago
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            });
        }
    });
});

//Eliminar clientes
pagoRoutes.post('/delete', (req, res) => {
    pagos_model_1.Pago.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe el Pago'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});

exports.default = pagoRoutes;
