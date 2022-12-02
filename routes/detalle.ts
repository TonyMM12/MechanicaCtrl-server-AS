import { Response, Router } from "express";
import { Detalle } from "../models/detalle.model";


const detalleRoutes = Router();

//crear detalle
detalleRoutes.post('/', (req:any, res:Response)=>{
    const body = req.body;       

    Detalle.create(body).then( async postDB=>{        
        await postDB.populate('producto');        
        res.json({
            ok:true,
            post: postDB
        });

    }).catch(err=>{
        res.json(err)
    });
   
});

//consultar detalle
detalleRoutes.get('/',async(req:any, res:Response)=>{
    
    const detalle = await Detalle.find()
                                  .sort({_id:-1})
                                  .limit(10)
                                  .populate('producto')
                                  .exec();

    res.json({
        ok:true,
        get: detalle
    });

});

//Actualizar detalle
detalleRoutes.post('/update',(req: any, res: Response)=>{


    const detalle={    
        producto: req.body.producto,
        cantidad: req.body.cantidad,                   
    }
    Detalle.findByIdAndUpdate(req.body._id,detalle,{new:true},(err,userDB) =>{
        if(!err){
        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'No existe el Detalle'
            });
        }        
        res.json({
            ok: true,
            Detalle: detalle
        });    
        }else{
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            }); 
        }       
    });
    
});

//Eliminar detalle
detalleRoutes.post('/delete',(req: any, res: Response)=>{
    
    Detalle.findByIdAndDelete(req.body._id,function(err: any) {
        if (err)
            return res.json({
                ok:false,
                mensaje: 'No existe el Detalle'
            });
        else
            return res.json({
                ok:true,
                mensaje: 'Eliminado'
            });
    });
});

export default detalleRoutes;