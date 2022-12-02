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
const productoRoutes = (0, express_1.Router)();
//crear producto
productoRoutes.post("/", (req, res) => {
    req.body.tipo = 'p';
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
//consultar producto
productoRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = yield inventario_model_1.Inventario.find({ tipo: "p" })
        .sort({ _id: -1 })
        .limit(10)
        .exec();
    res.json({
        ok: true,
        get: producto,
    });
}));
//Actualizar producto
productoRoutes.post("/update", (req, res) => {
    const producto = {
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
    inventario_model_1.Inventario.findByIdAndUpdate(req.body._id, producto, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: "No existe el producto",
                });
            }
            res.json({
                ok: true,
                Producto: producto,
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
//Disminuir producto
productoRoutes.post("/restar", (req, res) => {
    inventario_model_1.Inventario.findByIdAndUpdate(req.body._id, { $inc: { unidades: req.body.cantidad } }, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: "No existe el producto",
                });
            }
            res.json({
                ok: true,
                Producto: req.body,
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
//Aumentar producto
productoRoutes.post("/sumar", (req, res) => {
    inventario_model_1.Inventario.findByIdAndUpdate(req.body._id, { $inc: { unidades: req.body.cantidad } }, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: "No existe el producto",
                });
            }
            res.json({
                ok: true,
                Producto: req.body,
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
productoRoutes.post('/delete', (req, res) => {
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

exports.default = productoRoutes;
