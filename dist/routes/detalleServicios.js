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
const detalleServicios_model_1 = require("../models/detalleServicios.model");
const detalleServicioRoutes = (0, express_1.Router)();
//crear detalleServicio
detalleServicioRoutes.post('/', (req, res) => {
    const body = req.body;
    //body.servicio = req.get('_id');    
    detalleServicios_model_1.DetalleServicio.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        //  await postDB.populate('servicio');
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//consultar detalleServicio
detalleServicioRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleServicio = yield detalleServicios_model_1.DetalleServicio.find()
        .sort({ _id: -1 })
        .limit(10)
        .exec();
    res.json({
        ok: true,
        detalleServicio
    });
}));
//Actualizar detalleServicio
detalleServicioRoutes.post('/update', (req, res) => {
    const detalleServicio = {
        producto: req.body.producto,
        cantidad: req.body.cantidad,
    };
    detalleServicios_model_1.DetalleServicio.findByIdAndUpdate(req.get('_id'), detalleServicio, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe el Detalle de Servicio'
                });
            }
            res.json({
                ok: true,
                DetalleServicio: detalleServicio
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
detalleServicioRoutes.post('/delete', (req, res) => {
    detalleServicios_model_1.DetalleServicio.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe el DetalleServicio'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});

exports.default = detalleServicioRoutes;
