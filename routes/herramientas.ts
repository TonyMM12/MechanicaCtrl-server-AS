import { Response, Router } from "express";
import { Inventario } from "../models/inventario.model";

const herramientaRoutes = Router();

//crear herramienta
herramientaRoutes.post("/", (req: any, res: Response) => {
  req.body.tipo = "h";
  const body = req.body;

  Inventario.create(body)
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

//consultar herramienta
herramientaRoutes.get("/", async (req: any, res: Response) => {
  const herramienta = await Inventario.find({ tipo: "h" })
    .sort({ _id: -1 })
    .limit(10)
    .exec();

  res.json({
    ok: true,
    get: herramienta,
  });
});

//Actualizar herramienta
herramientaRoutes.post("/update", (req: any, res: Response) => {
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
  Inventario.findByIdAndUpdate(
    req.body._id,
    herramienta,
    { new: true },
    (err, userDB) => {
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

//Eliminar Inventario
herramientaRoutes.post('/delete',(req: any, res: Response)=>{
    
  Inventario.findByIdAndDelete(req.body._id,function(err: any) {
      if (err)
          return res.json({
              ok:false,
              mensaje: 'No existe el Inventario'
          });
      else
          return res.json({
              ok:true,
              mensaje: 'Eliminado'
          });
  });
});

export default herramientaRoutes;
