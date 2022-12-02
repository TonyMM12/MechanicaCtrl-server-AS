import { Response, Router } from "express";
import { Auto } from "../models/autos.model";





const autoRoutes = Router();

//crear auto
autoRoutes.post('/', (req:any, res:Response)=>{
    const body = req.body;   
    Auto.create(body).then( async postDB=>{
        await postDB.populate('cliente');
        res.json({
            ok:true,
            post: postDB
        });

    }).catch(err=>{
        res.json(err)
    });
   
});

//consultar autos
autoRoutes.get('/',async(req:any, res:Response)=>{
    
    const autos = await Auto.find()
                                  .sort({_id:-1})
                                  .limit(10)
                                  .populate('cliente')
                                  .exec();

    res.json({
        ok:true,
        get: autos
    });

});

//Actualizar auto
autoRoutes.post('/update',(req: any, res: Response)=>{


    const auto={
        cliente: req.body.cliente,
        placa: req.body.placa,
        marca: req.body.marca,
        modelo: req.body.modelo,
        color: req.body.color||'',
        anio: req.body.anio,
        transmicion: req.body.transmicion,
        identificadorUnico: req.body.identificadorUnico||''
                  
    }
    Auto.findByIdAndUpdate(req.body._id,auto,{new:true},(err,userDB) =>{
        if(!err){
        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'No existe el auto'
            });
        }        
        res.json({
            ok: true,
            Auto: auto
        });  
        }else{
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            }); 
        }   
    });
    
});

//Eliminar Auto
autoRoutes.post('/delete',(req: any, res: Response)=>{
    
    Auto.findByIdAndDelete(req.body._id,function(err: any) {
        if (err)
            return res.json({
                ok:false,
                mensaje: 'No existe el Auto'
            });
        else
            return res.json({
                ok:true,
                mensaje: 'Eliminado'
            });
    });
});

export default autoRoutes;