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
const empleados_model_1 = require("../models/empleados.model");
const empleadoRoutes = (0, express_1.Router)();
//crear empleado
empleadoRoutes.post('/', (req, res) => {
    const body = req.body;
    empleados_model_1.Empleado.create(body).then(postDB => {
        res.json({
            ok: true,
            post: postDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//consultar empleados
empleadoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empleados = yield empleados_model_1.Empleado.find()
        .sort({ _id: -1 })
        .limit(10)
        .exec();
    res.json({
        ok: true,
        get: empleados
    });
}));
//Actualizar empleado
empleadoRoutes.post('/update', (req, res) => {
    const empleado = {
        nombre: req.body.nombre,
        sexo: req.body.sexo,
        telefono: req.body.telefono,
        email: req.body.email,
        domicilio: req.body.domicilio,
        colonia: req.body.colonia,
        municipio: req.body.municipio,
        estado: req.body.estado,
        cp: req.body.cp,
        experiencia: req.body.experiencia,
        puesto: req.body.puesto,
        nacimiento: req.body.nacimiento,
        incorporacion: req.body.incorporacion,
        nss: req.body.nss,
        rfc: req.body.rfc,
    };
    empleados_model_1.Empleado.findByIdAndUpdate(req.body._id, empleado, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe el empleado'
                });
            }
            res.json({
                ok: true,
                Empleado: empleado
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
empleadoRoutes.post('/delete', (req, res) => {
    empleados_model_1.Empleado.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe el Empleado'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});

exports.default = empleadoRoutes;
