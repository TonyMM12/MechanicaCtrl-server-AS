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
const inventario_model_1 = require("../models/inventario.model");
const herramientaRoutes = (0, express_1.Router)();
//crear herramienta
herramientaRoutes.post("/", (req, res) => {
    req.body.tipo = "h";
    const body = req.body;
    inventario_model_1.Inventario.create(body)
        .then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        res.json({
            ok: true,
            post: postDB,
        });
    }))
        .catch((err) => {
        res.json(err);
    });
});
//consultar herramienta
herramientaRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const herramienta = yield inventario_model_1.Inventario.find({ tipo: "h" })
        .sort({ _id: -1 })
        .limit(10)
        .exec();
    res.json({
        ok: true,
        get: herramienta,
    });
}));
//Actualizar herramienta
herramientaRoutes.post("/update", (req, res) => {
    const herramienta = {
        nombre: req.body.nombre,
        marca: req.body.marca,
        modelo: req.body.modelo,
        ubicacion: req.body.ubicacion,
        costo: req.body.costo,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        unidades: req.body.unidades,
        tipo: req.body.tipo,
    };
    inventario_model_1.Inventario.findByIdAndUpdate(req.body._id, herramienta, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: "No existe la herramienta",
                });
            }
            res.json({
                ok: true,
                Herramienta: herramienta,
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: "No se pudo actualizar ya que hay un problema con el campo que desea actualizar",
            });
        }
    });
});

//Eliminar clientes
herramientaRoutes.post('/delete', (req, res) => {
    inventario_model_1.Inventario.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe el Inventario'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});

exports.default = herramientaRoutes;
