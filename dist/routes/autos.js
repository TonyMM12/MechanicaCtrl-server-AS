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
const autos_model_1 = require("../models/autos.model");
const autoRoutes = (0, express_1.Router)();
//crear auto
autoRoutes.post('/', (req, res) => {
    const body = req.body;
    autos_model_1.Auto.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('cliente');
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//consultar autos
autoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const autos = yield autos_model_1.Auto.find()
        .sort({ _id: -1 })
        .limit(10)
        .populate('cliente')
        .exec();
    res.json({
        ok: true,
        get: autos
    });
}));
//Actualizar auto
autoRoutes.post('/update', (req, res) => {
    const auto = {
        cliente: req.body.cliente,
        placa: req.body.placa,
        marca: req.body.marca,
        modelo: req.body.modelo,
        color: req.body.color || '',
        anio: req.body.anio,
        transmicion: req.body.transmicion,
        identificadorUnico: req.body.identificadorUnico || ''
    };
    autos_model_1.Auto.findByIdAndUpdate(req.body._id, auto, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe el auto'
                });
            }
            res.json({
                ok: true,
                Auto: auto
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
autoRoutes.post('/delete', (req, res) => {
    autos_model_1.Auto.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe el Auto'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});

exports.default = autoRoutes;
