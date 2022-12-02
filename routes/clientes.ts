import { Response, Router } from "express";
import { Cliente } from '../models/clientes.model';




const clienteRoutes = Router();

//crear cliente
clienteRoutes.post('/', (req:any, res:Response)=>{
    const body = req.body;

    Cliente.create(body).then(postDB=>{
        res.json({
            ok:true,
            post: postDB
        });

    }).catch(err=>{
        res.json(err)
    });
   
});

//consultar clientes
clienteRoutes.get('/',async(req:any, res:Response)=>{
    
    const clientes = await Cliente.find()
                                  .sort({_id:-1})
                                  .limit(10)
                                  .exec();

    res.json({
        ok:true,
        get: clientes
    });

});

//Actualizar cliente
clienteRoutes.post('/update',(req: any, res: Response)=>{


    const cliente={
        nombre: req.body.nombre,       
        telefono:   req.body.telefono,
        email:  req.body.email,
        domicilio:  req.body.domicilio,
        colonia:  req.body.colonia,
        estado:  req.body.estado,
        municipio: req.body.municipio,
        cp:  req.body.cp || 0            
    }
    Cliente.findByIdAndUpdate(req.body._id,cliente,{new:true},(err,userDB) =>{
        if(!err){
        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'No existe el cliente'
            });
        }        
        res.json({
            ok: true,
            cliente: cliente
        });  
        }else{
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            }); 
        }      
    });
    
});

//Eliminar clientes
clienteRoutes.post('/delete',(req: any, res: Response)=>{
    
    Cliente.findByIdAndDelete(req.body._id,function(err: any) {
        if (err)
            return res.json({
                ok:false,
                mensaje: 'No existe el cliente'
            });
        else
            return res.json({
                ok:true,
                mensaje: 'Eliminado'
            });
    });
});

export default clienteRoutes;