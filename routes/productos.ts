import { Response, Router } from "express";
import { Inventario } from "../models/inventario.model";

const productoRoutes = Router();

//crear producto
productoRoutes.post("/", (req: any, res: Response) => {
  req.body.tipo= 'p'; 
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

//consultar producto
productoRoutes.get("/", async (req: any, res: Response) => {
  const producto = await Inventario.find({ tipo: "p" })
    .sort({ _id: -1 })
    .limit(10)
    .exec();

  res.json({
    ok: true,
    get: producto,
  });
});

//Actualizar producto
productoRoutes.post("/update", (req: any, res: Response) => {
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
  Inventario.findByIdAndUpdate(
    req.body._id,
    producto,
    { new: true },
    (err, userDB) => {
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
      }else{
        res.json({
            ok: false,
            mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
        }); 
      }   
    }
  );
});

//Disminuir producto
productoRoutes.post("/restar", (req: any, res: Response) => {  
  Inventario.findByIdAndUpdate(
    req.body._id,
    {$inc:{unidades: req.body.cantidad}},
    { new: true },
    (err, userDB) => {
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
      }else{
        res.json({
            ok: false,
            mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
        }); 
      }   
    }
  );
});

//Aumentar producto
productoRoutes.post("/sumar", (req: any, res: Response) => {  
  Inventario.findByIdAndUpdate(
    req.body._id,
    {$inc:{unidades: req.body.cantidad}},
    { new: true },
    (err, userDB) => {
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
      }else{
        res.json({
            ok: false,
            mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
        }); 
      }   
    }
  );
});

//Eliminar Inventario
productoRoutes.post('/delete',(req: any, res: Response)=>{
    
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

export default productoRoutes;
