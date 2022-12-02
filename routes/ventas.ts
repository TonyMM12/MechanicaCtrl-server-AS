import { Response, Router } from "express";
import { Venta } from "../models/ventas.model";


const ventaRoutes = Router();

//crear venta
ventaRoutes.post('/', (req:any, res:Response)=>{
    const body = req.body;    

    Venta.create(body).then( async postDB=>{
        await postDB.populate('cliente');
        res.json({
            ok:true,
            post: postDB
        });

    }).catch(err=>{
        res.json(err)
    });
   
});

//consultar venta
ventaRoutes.get('/',async(req:any, res:Response)=>{
    
    const venta = await Venta.find()
                                  .sort({_id:-1})
                                  .limit(10)
                                  .populate('cliente')
                                  .populate('detalle.producto')
                                  .exec();

    res.json({
        ok:true,
        get: venta
    });

});

//Actualizar venta
ventaRoutes.post('/update',(req: any, res: Response)=>{


    const venta={
        cliente: req.body.cliente,
        detalle: req.body.detalle,
        total: req.body.total,                   
    }
    Venta.findByIdAndUpdate(req.body._id,venta,{new:true},(err,userDB) =>{
        if(!err){
        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'No existe la venta'
            });
        }        
        res.json({
            ok: true,
            Venta: venta
        }); 
        }else{
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            }); 
        }          
    });
    
});

//Eliminar Venta
ventaRoutes.post('/delete',(req: any, res: Response)=>{
    
    Venta.findByIdAndDelete(req.body._id,function(err: any) {
        if (err)
            return res.json({
                ok:false,
                mensaje: 'No existe el Venta'
            });
        else
            return res.json({
                ok:true,
                mensaje: 'Eliminado'
            });
    });
});

export default ventaRoutes;