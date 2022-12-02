import { Response, Router } from "express";
import { Servicio } from "../models/servicios.model";

const servicioRoutes = Router();

//crear servicio
servicioRoutes.post('/', (req:any, res:Response)=>{
    const body = req.body;    

    Servicio.create(body).then( async postDB=>{
        await postDB.populate('auto');
        await postDB.populate('detalle.producto');
        res.json({
            ok:true,
            post: postDB
        });

    }).catch(err=>{
        res.json(err)
    });
   
});

//consultar servicio
servicioRoutes.get('/',async(req:any, res:Response)=>{
    
    const servicio = await Servicio.find()
                                  .sort({_id:-1})
                                  .limit(10)
                                  .populate({
                                      path:'auto',
                                      populate: 'cliente'
                                    })
                                  .populate('detalle.producto')
                                  .exec();

    res.json({
        ok:true,
        get: servicio
    });

});

//Actualizar servicio
servicioRoutes.post('/update',(req: any, res: Response)=>{


    const servicio={
        auto: req.body.auto,
        tipo: req.body.tipo,    
        salida: req.body.salida,
        problema: req.body.problema,
        avance: req.body.avance,
        detalle: req.body.detalle,
        garantia: req.body.garantia,
        gasto: req.body.gasto,
        total: req.body.total,
        estatus: req.body.estatus
                  
    }
    Servicio.findByIdAndUpdate(req.body._id,servicio,{new:true},(err,userDB) =>{
        if(!err){
        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'No existe el servicio'
            });
        }        
        res.json({
            ok: true,
            Servicio: servicio
        });
        }else{
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            }); 
        }         
    });
    
});

//Eliminar Servicio
servicioRoutes.post('/delete',(req: any, res: Response)=>{
    
    Servicio.findByIdAndDelete(req.body._id,function(err: any) {
        if (err)
            return res.json({
                ok:false,
                mensaje: 'No existe el Servicio'
            });
        else
            return res.json({
                ok:true,
                mensaje: 'Eliminado'
            });
    });
});

export default servicioRoutes;