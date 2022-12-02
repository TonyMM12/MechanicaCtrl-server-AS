import { Response, Router } from "express";
import { Empleado } from "../models/empleados.model";





const empleadoRoutes = Router();

//crear empleado
empleadoRoutes.post('/', (req:any, res:Response)=>{
    const body = req.body;

    Empleado.create(body).then(postDB=>{
        res.json({
            ok:true,
            post: postDB
        });

    }).catch(err=>{
        res.json(err)
    });
   
});

//consultar empleados
empleadoRoutes.get('/',async(req:any, res:Response)=>{
    
    const empleados = await Empleado.find()
                                  .sort({_id:-1})
                                  .limit(10)
                                  .exec();
    

    res.json({
        ok:true,
        get: empleados
    });

});

//Actualizar empleado
empleadoRoutes.post('/update',(req: any, res: Response)=>{


    const empleado={        
        nombre: req.body.nombre ,
        sexo: req.body.sexo ,
        telefono: req.body.telefono ,
        email: req.body.email ,
        domicilio: req.body.domicilio ,
        colonia: req.body.colonia ,
        municipio: req.body.municipio ,
        estado: req.body.estado ,
        cp: req.body.cp ,
        experiencia: req.body.experiencia ,
        puesto: req.body.puesto ,
        nacimiento: req.body.nacimiento ,
        incorporacion: req.body.incorporacion ,
        nss: req.body.nss ,
        rfc: req.body.rfc ,
    }
    Empleado.findByIdAndUpdate(req.body._id,empleado,{new:true},(err,userDB) =>{
        if(!err){
        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'No existe el empleado'
            });
        }        
        res.json({
            ok: true,
            Empleado: empleado
        });  
        }else{
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            }); 
        }      
    });
    
});

//Eliminar Empleado
empleadoRoutes.post('/delete',(req: any, res: Response)=>{
    
    Empleado.findByIdAndDelete(req.body._id,function(err: any) {
        if (err)
            return res.json({
                ok:false,
                mensaje: 'No existe el Empleado'
            });
        else
            return res.json({
                ok:true,
                mensaje: 'Eliminado'
            });
    });
});

export default empleadoRoutes;