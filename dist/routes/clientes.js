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
const clientes_model_1 = require("../models/clientes.model");
const clienteRoutes = (0, express_1.Router)();
//crear cliente
clienteRoutes.post('/', (req, res) => {
    const body = req.body;
    clientes_model_1.Cliente.create(body).then(postDB => {
        res.json({
            ok: true,
            post: postDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//consultar clientes
clienteRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield clientes_model_1.Cliente.find()
        .sort({ _id: -1 })
        .limit(10)
        .exec();
    res.json({
        ok: true,
        get: clientes
    });
}));
//Actualizar cliente
clienteRoutes.post('/update', (req, res) => {
    const cliente = {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        domicilio: req.body.domicilio,
        colonia: req.body.colonia,
        estado: req.body.estado,
        municipio: req.body.municipio,
        cp: req.body.cp || 0
    };
    clientes_model_1.Cliente.findByIdAndUpdate(req.body._id, cliente, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe el cliente'
                });
            }
            res.json({
                ok: true,
                cliente: cliente
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
clienteRoutes.post('/delete', (req, res) => {
    clientes_model_1.Cliente.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe el cliente'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});

exports.default = clienteRoutes;
