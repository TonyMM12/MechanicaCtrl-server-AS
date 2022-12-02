import { Response, Router } from "express";
import { Compra } from "../models/compras.model";

const compraRoutes = Router();

//crear compra
compraRoutes.post("/", (req: any, res: Response) => {
  const body = req.body;

  Compra.create(body)
    .then(async (postDB) => {
      res.json({
        ok: true,
        post: postDB,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

//consultar compra
compraRoutes.get("/", async (req: any, res: Response) => {
  const compra = await Compra.find()
    .sort({ _id: -1 })
    .limit(10)
    .populate("detalle.producto")
    .exec();

  res.json({
    ok: true,
    get: compra,
  });
});

//Actualizar compra
compraRoutes.post("/update", (req: any, res: Response) => {
  const compra = {
    detalle: req.body.detalle,
    total: req.body.total,
  };
  Compra.findByIdAndUpdate(
    req.body._id,
    compra,
    { new: true },
    (err, userDB) => {
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
      } else {
        res.json({
          ok: false,
          mensaje:
            "No se pudo actualizar ya que hay un problema con el campo que desea actualizar",
        });
      }
    }
  );
});

//Eliminar detalle
compraRoutes.post('/delete',(req: any, res: Response)=>{
    
  Compra.findByIdAndDelete(req.body._id,function(err: any) {
      if (err)
          return res.json({
              ok:false,
              mensaje: 'No existe la compra'
          });
      else
          return res.json({
              ok:true,
              mensaje: 'Eliminado'
          });
  });
});

export default compraRoutes;
