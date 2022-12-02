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
const compras_model_1 = require("../models/compras.model");
const compraRoutes = (0, express_1.Router)();
//crear compra
compraRoutes.post("/", (req, res) => {
    const body = req.body;
    compras_model_1.Compra.create(body)
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
//consultar compra
compraRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const compra = yield compras_model_1.Compra.find()
        .sort({ _id: -1 })
        .limit(10)
        .populate("detalle.producto")
        .exec();
    res.json({
        ok: true,
        get: compra,
    });
}));
//Actualizar compra
compraRoutes.post("/update", (req, res) => {
    const compra = {
        detalle: req.body.detalle,
        total: req.body.total,
    };
    compras_model_1.Compra.findByIdAndUpdate(req.body._id, compra, { new: true }, (err, userDB) => {
        if (!err) {
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: "No existe la compra",
                });
            }
            res.json({
                ok: true,
                Compra: compra,
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
compraRoutes.post('/delete', (req, res) => {
    compras_model_1.Compra.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            return res.json({
                ok: false,
                mensaje: 'No existe la compra'
            });
        else
            return res.json({
                ok: true,
                mensaje: 'Eliminado'
            });
    });
});


exports.default = compraRoutes;
