import { Response, Router } from "express";
import { DetalleServicio } from "../models/detalleServicios.model";

const detalleServicioRoutes = Router();

//crear detalleServicio
detalleServicioRoutes.post('/', (req:any, res:Response)=>{
    const body = req.body;
    //body.servicio = req.get('_id');    

    DetalleServicio.create(body).then( async postDB=>{
      //  await postDB.populate('servicio');
        res.json({
            ok:true,
            post: postDB
        });

    }).catch(err=>{
        res.json(err)
    });
   
});

//consultar detalleServicio
detalleServicioRoutes.get('/',async(req:any, res:Response)=>{
    
    const detalleServicio = await DetalleServicio.find()
                                  .sort({_id:-1})
                                  .limit(10)
                                  .exec();

    res.json({
        ok:true,
        detalleServicio
    });

});

//Actualizar detalleServicio
detalleServicioRoutes.post('/update',(req: any, res: Response)=>{


    const detalleServicio={    
        producto: req.body.producto,
        cantidad: req.body.cantidad,                   
    }
    DetalleServicio.findByIdAndUpdate(req.get('_id'),detalleServicio,{new:true},(err,userDB) =>{
        if(!err){
        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'No existe el Detalle de Servicio'
            });
        }        
        res.json({
            ok: true,
            DetalleServicio: detalleServicio
        }); 
        }else{
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            }); 
        }          
    });
    
});

//Eliminar DetalleServicio
detalleServicioRoutes.post('/delete',(req: any, res: Response)=>{
    
    DetalleServicio.findByIdAndDelete(req.body._id,function(err: any) {
        if (err)
            return res.json({
                ok:false,
                mensaje: 'No existe el DetalleServicio'
            });
        else
            return res.json({
                ok:true,
                mensaje: 'Eliminado'
            });
    });
});

export default detalleServicioRoutes;