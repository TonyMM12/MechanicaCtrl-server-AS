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
const detalle_model_1 = require("../models/detalle.model");
const detalleRoutes = (0, express_1.Router)();
//crear detalle
detalleRoutes.post('/', (req, res) => {
    const body = req.body;
    detalle_model_1.Detalle.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('producto');
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//consultar detalle
detalleRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalle = yield detalle_model_1.Detalle.find()
        .sort({ _id: -1 })
        .limit(10)
        .populate('producto')
        .exec();
    res.json({
        ok: true,
        get: detalle
    });
}));
//Actualizar detalle
detalleRoutes.post('/update', (req, res) => {
    const detalle = {
        producto: req.body.producto,
        cantidad: req.body.cantidad,
    };
    detalle_model_1.Detalle.findByIdAndUpdate(req.body._id, detalle, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe el Detalle'
                });
            }
            res.json({
                ok: true,
                Detalle: detalle
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
//Eliminar detalle
detalleRoutes.post('/delete', (req, res) => {
    detalle_model_1.Detalle.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe el Detalle'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});
exports.default = detalleRoutes;
