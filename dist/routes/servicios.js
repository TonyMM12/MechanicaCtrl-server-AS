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
const servicios_model_1 = require("../models/servicios.model");
const servicioRoutes = (0, express_1.Router)();
//crear servicio
servicioRoutes.post('/', (req, res) => {
    const body = req.body;
    servicios_model_1.Servicio.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('auto');
        yield postDB.populate('detalle.producto');
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//consultar servicio
servicioRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const servicio = yield servicios_model_1.Servicio.find()
        .sort({ _id: -1 })
        .limit(10)
        .populate({
        path: 'auto',
        populate: 'cliente'
    })
        .populate('detalle.producto')
        .exec();
    res.json({
        ok: true,
        get: servicio
    });
}));
//Actualizar servicio
servicioRoutes.post('/update', (req, res) => {
    const servicio = {
        auto: req.body.auto,
        tipo: req.body.tipo,
        salida: req.body.salida,
        problema: req.body.problema,
        avance: req.body.avance,
        detalle: req.body.detalle,
        garantia: req.body.garantia,
        gasto: req.body.gasto,
        total: req.body.total,
        estatus: req.body.estatus
    };
    servicios_model_1.Servicio.findByIdAndUpdate(req.body._id, servicio, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe el servicio'
                });
            }
            res.json({
                ok: true,
                Servicio: servicio
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
servicioRoutes.post('/delete', (req, res) => {
    servicios_model_1.Servicio.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe el Servicio'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});

exports.default = servicioRoutes;
