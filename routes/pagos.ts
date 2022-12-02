import { Response, Router } from "express";
import { Pago } from "../models/pagos.model";

const pagoRoutes = Router();

//crear pago
pagoRoutes.post('/', (req:any, res:Response)=>{
    const body = req.body;
    Pago.create(body).then( async postDB=>{    
        res.json({
            ok:true,
            post: postDB
        });

    }).catch(err=>{
        res.json(err)
    });
   
});

//consultar pago
pagoRoutes.get('/',async(req:any, res:Response)=>{
    
    const pago = await Pago.find()
                                  .sort({_id:-1})
                                  .limit(10)
                                  .populate('empleado')
                                  .exec();

    res.json({
        ok:true,
        get: pago
    });

});

//Actualizar pago
pagoRoutes.post('/update',(req: any, res: Response)=>{


    const pago={
        empleado: req.body.empleado,
        dias: req.body.dias,
        horas: req.body.horas,
        extras: req.body.estras,
        inicio: req.body.inicio,
        fin: req.body.fin,
        impuestos: req.body.impuestos,
        ss: req.body.ss,
        subtotal: req.body.subtotal,
        total: req.body.total,    
        estatus: req.body.total,                  
    }
    Pago.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,userDB) =>{
        if(!err){
        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'No existe pago'
            });
        }        
        res.json({
            ok: true,
            Pago: pago
        });
        }else{
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            }); 
        }           
    });
    
});

//Eliminar Pago
pagoRoutes.post('/delete',(req: any, res: Response)=>{
    
    Pago.findByIdAndDelete(req.body._id,function(err: any) {
        if (err)
            return res.json({
                ok:false,
                mensaje: 'No existe el Pago'
            });
        else
            return res.json({
                ok:true,
                mensaje: 'Eliminado'
            });
    });
});

export default pagoRoutes;