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
const ventas_model_1 = require("../models/ventas.model");
const ventaRoutes = (0, express_1.Router)();
//crear venta
ventaRoutes.post('/', (req, res) => {
    const body = req.body;
    ventas_model_1.Venta.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('cliente');
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//consultar venta
ventaRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venta = yield ventas_model_1.Venta.find()
        .sort({ _id: -1 })
        .limit(10)
        .populate('cliente')
        .populate('detalle.producto')
        .exec();
    res.json({
        ok: true,
        get: venta
    });
}));
//Actualizar venta
ventaRoutes.post('/update', (req, res) => {
    const venta = {
        cliente: req.body.cliente,
        detalle: req.body.detalle,
        total: req.body.total,
    };
    ventas_model_1.Venta.findByIdAndUpdate(req.body._id, venta, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe la venta'
                });
            }
            res.json({
                ok: true,
                Venta: venta
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

//Eliminar Venta
ventaRoutes.post('/delete', (req, res) => {
    ventas_model_1.Venta.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe el Venta'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});

exports.default = ventaRoutes;
