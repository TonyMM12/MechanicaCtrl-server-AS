import { Response, Router } from "express";
import { Inventario } from "../models/inventario.model";

const inventarioRoutes = Router();

//consultar inventario
inventarioRoutes.get("/", async (req: any, res: Response) => {
  const inventario = await Inventario.find()
    .sort({ _id: -1 })    
    .exec();

  res.json({
    ok: true,
    get: inventario,
  });
});

//Eliminar inventario
inventarioRoutes.post('/delete',(req: any, res: Response)=>{
    
  Inventario.findByIdAndDelete(req.body._id,function(err: any) {
      if (err)
          return res.json({
              ok:false,
              mensaje: 'No existe el inventario'
          });
      else
          return res.json({
              ok:true,
              mensaje: 'Eliminado'
          });
  });
});

export default inventarioRoutes;
